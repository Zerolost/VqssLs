import json
import re
from pathlib import Path

root = Path(__file__).resolve().parents[2]
overrides_path = root / "Venera" / "address-overrides.json"
if not overrides_path.exists():
  raise SystemExit("address-overrides.json is missing")
overrides = json.loads(overrides_path.read_text(encoding="utf-8")).get("sources", {})
index_path = root / "Venera" / "venera-next-all-sources.json"
items = json.loads(index_path.read_text(encoding="utf-8"))
by_file = {item["url"].rsplit("/", 1)[-1]: item for item in items}
for file_name, rules in overrides.items():
  path = root / "Venera" / "sources" / file_name
  if not path.exists():
    raise SystemExit(f"override target does not exist: {file_name}")
  text = path.read_text(encoding="utf-8")
  changed = False
  bump = False
  for rule in rules:
    old = rule["find"]
    new = rule["replace"]
    if old not in text:
      raise SystemExit(f"override text not found: {file_name}: {old}")
    text = text.replace(old, new)
    changed = True
    bump = bump or bool(rule.get("bumpVersion"))
  if changed:
    if bump:
      match = re.search(r'version\s*=\s*["\'](\d+)\.(\d+)\.(\d+)["\']', text)
      if not match:
        raise SystemExit(f"version not found: {file_name}")
      major, minor, patch = map(int, match.groups())
      version = f"{major}.{minor}.{patch + 1}"
      text = text[:match.start(1)] + version + text[match.end(1):]
      by_file[file_name]["version"] = version
    path.write_text(text, encoding="utf-8")
index_path.write_text(json.dumps(items, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"applied overrides: {len(overrides)}")
