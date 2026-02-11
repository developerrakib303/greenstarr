import json

file_path = 'd:\\Client\\Green star\\html\\Aircon.json'

with open(file_path, 'r') as f:
    data = json.load(f)

# Find comp_0 asset
assets = data.get('assets', [])
for asset in assets:
    if asset.get('id') == 'comp_0':
        layers = asset.get('layers', [])
        # Keep only 'Layer 1 Outlines'
        new_layers = [l for l in layers if l.get('nm') == 'Layer 1 Outlines']
        asset['layers'] = new_layers
        break

with open(file_path, 'w') as f:
    json.dump(data, f)
