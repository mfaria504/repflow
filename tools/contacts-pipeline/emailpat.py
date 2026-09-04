"""Email pattern inference for the contact list.

Patterns are named by how first/last name map to the local part:
  first            -> david
  last             -> coleman
  flast            -> dcoleman
  firstl           -> davidc
  first.last       -> david.coleman
  first_last       -> david_coleman
  firstlast        -> davidcoleman
  f.last           -> d.coleman
  lastf            -> colemand
  last.first       -> coleman.david
  lastfirst        -> colemandavid
  fl               -> dc
"""
import re
import unicodedata

PATTERNS = [
    "first", "flast", "first.last", "firstl", "firstlast", "first_last",
    "f.last", "last", "lastf", "last.first", "lastfirst", "fl", "first-last",
]

NICKNAMES = {
    "mike": "michael", "bill": "william", "will": "william", "bob": "robert", "rob": "robert",
    "bobby": "robert", "jim": "james", "jimmy": "james", "dave": "david", "dan": "daniel",
    "danny": "daniel", "tom": "thomas", "tommy": "thomas", "rick": "richard", "rich": "richard",
    "dick": "richard", "chris": "christopher", "matt": "matthew", "steve": "steven", "steve.": "stephen",
    "joe": "joseph", "joey": "joseph", "tony": "anthony", "andy": "andrew", "drew": "andrew",
    "jeff": "jeffrey", "greg": "gregory", "ken": "kenneth", "kenny": "kenneth", "ron": "ronald",
    "ronnie": "ronald", "don": "donald", "ed": "edward", "eddie": "edward", "ted": "edward",
    "ray": "raymond", "pat": "patrick", "nick": "nicholas", "ben": "benjamin", "sam": "samuel",
    "tim": "timothy", "jon": "jonathan", "jerry": "gerald", "larry": "lawrence", "terry": "terrence",
    "pete": "peter", "phil": "philip", "fred": "frederick", "frank": "francis", "hank": "henry",
    "chuck": "charles", "charlie": "charles", "jack": "john", "johnny": "john", "al": "albert",
    "alex": "alexander", "gabe": "gabriel", "jake": "jacob", "josh": "joshua", "zach": "zachary",
    "kate": "katherine", "kathy": "katherine", "katie": "katherine", "beth": "elizabeth",
    "liz": "elizabeth", "betty": "elizabeth", "sue": "susan", "suzy": "susan", "peggy": "margaret",
    "maggie": "margaret", "meg": "margaret", "debbie": "deborah", "deb": "deborah", "jen": "jennifer",
    "jenny": "jennifer", "jess": "jessica", "becky": "rebecca", "chrissy": "christine", "vicki": "victoria",
    "vicky": "victoria", "cindy": "cynthia", "cyndi": "cynthia", "sandy": "sandra", "patty": "patricia",
    "trish": "patricia", "barb": "barbara", "nancy": "ann", "kim": "kimberly", "mandy": "amanda",
    "mel": "melissa", "abby": "abigail", "nikki": "nicole", "steph": "stephanie", "sam.": "samantha",
    "terri": "teresa", "trey": "trey", "ryan": "ryan",
}


def norm(s: str) -> str:
    s = unicodedata.normalize("NFKD", s or "").encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z]", "", s.lower())


def split_name(full: str):
    full = (full or "").strip()
    full = re.sub(r",.*$", "", full)  # drop suffixes after comma (CPMR, Jr., etc.)
    full = re.sub(r"\b(Jr\.?|Sr\.?|II|III|IV|CPMR|CPSC|P\.?E\.?|MBA|CSP)\b", "", full).strip()
    parts = [p for p in re.split(r"\s+", full) if p]
    if not parts:
        return "", ""
    if len(parts) == 1:
        return parts[0], ""
    first = parts[0]
    # handle "de", "van", "mc" etc: last = everything after first, minus middle initials
    rest = [p for p in parts[1:] if not re.fullmatch(r"[A-Za-z]\.?", p)]
    last = " ".join(rest) if rest else parts[-1]
    # nickname in quotes or parens: Robert "Bob" Smith
    m = re.search(r'["\(]([A-Za-z]+)["\)]', (full))
    if m:
        first = m.group(1)
    return first, last


def render(pattern: str, first: str, last: str) -> str:
    f, l = norm(first), norm(last)
    if not f:
        return ""
    fi = f[:1]
    li = l[:1]
    table = {
        "first": f,
        "last": l,
        "flast": fi + l,
        "firstl": f + li,
        "first.last": f + "." + l,
        "first_last": f + "_" + l,
        "first-last": f + "-" + l,
        "firstlast": f + l,
        "f.last": fi + "." + l,
        "lastf": l + fi,
        "last.first": l + "." + f,
        "lastfirst": l + f,
        "fl": fi + li,
    }
    v = table.get(pattern, "")
    if pattern != "first" and not l:
        return ""
    return v


def detect(email: str, first: str, last: str):
    """Return the pattern name that produces `email`'s local part from the name, or None."""
    local = (email or "").split("@")[0].lower()
    local = re.sub(r"[^a-z._-]", "", local)
    if not local:
        return None
    cands = [(first, last)]
    nf = NICKNAMES.get(norm(first))
    if nf:
        cands.append((nf, last))
    # reverse nickname (email uses nickname, name uses full)
    for nick, fullname in NICKNAMES.items():
        if fullname == norm(first):
            cands.append((nick, last))
    for f, l in cands:
        for p in PATTERNS:
            if render(p, f, l) == local:
                return p
    return None
