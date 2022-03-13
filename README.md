# angular-leaflet-sample

Angular で Leaflet を使用するサンプル。

Copyright Leaflet <https://leafletjs.com/>
Copyright OpenStreetMap <https://www.openstreetmap.org>

## Leaflet のインポート

このサンプルで Leaflet を使用する場合、下記のようにインポートするように統一した。

```typescript
import 'leaflet.markercluster'; // MarkerClusterGroup を使用する際に必要。
import * as leaflet from 'leaflet'; // Leaflet は他ライブラリーと重複するクラス名が存在するため、別名でインポートする。
```
