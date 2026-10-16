import json
import os
from pathlib import Path

root = Path(__file__).resolve().parents[2]
source_root = root / "Venera" / "sources"
source_root.mkdir(parents=True, exist_ok=True)
upstream = Path(os.environ.get("UPSTREAM_DIR", "/tmp/venera-configs"))
index_path = upstream / "index.json"
entries = json.loads(index_path.read_text(encoding="utf-8"))
for old_file in source_root.glob("*.js"):
  old_file.unlink()
result = []
for entry in entries:
  file_name = entry["fileName"]
  source_file = upstream / file_name
  target_file = source_root / file_name
  text = source_file.read_text(encoding="utf-8")
  source_url = f"https://cdn.jsdelivr.net/gh/Zerolost/VqssLs@main/Venera/sources/{file_name}"
  text = text.replace(entry.get("url", ""), source_url, 1)
  target_file.write_text(text, encoding="utf-8")
  item = {
    "name": entry["name"],
    "url": f"https://cdn.jsdelivr.net/gh/Zerolost/VqssLs@main/Venera/sources/{file_name}",
    "version": entry["version"]
  }
  if entry.get("description"):
    item["description"] = entry["description"]
  result.append(item)
(root / "Venera" / "venera-next-all-sources.json").write_text(
  json.dumps(result, ensure_ascii=False, indent=2) + "\n",
  encoding="utf-8"
)
print(f"synced {len(result)} sources")
