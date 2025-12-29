# AngularLeafletSample

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.4.

Angular で Leaflet を使用するサンプル。

Copyright Leaflet <https://leafletjs.com/>
Copyright OpenStreetMap <https://www.openstreetmap.org>

## Leaflet のインポート

このサンプルで Leaflet を使用する場合、下記のようにインポート方法を統一した。

```typescript
import 'leaflet.markercluster'; // MarkerClusterGroup を使用する際に必要。
import * as leaflet from 'leaflet'; // Leaflet は Map 、 map などが他ライブラリーと重複しやすいため、別名でインポートする。

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LeafletModule // LeafletModule をインポートする。
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
```
