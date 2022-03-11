import * as leaflet from 'leaflet';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-layer',
  templateUrl: './map-layer.component.html',
  styleUrls: ['./map-layer.component.css']
})
export class MapLayerComponent implements OnInit {

  public mapInfo?: leaflet.Map;

  public readonly mapElementId: string = 'mapInfo';

  public constructor() { }

  public ngOnInit(): void {
    this.mapInfo = new leaflet.Map(this.mapElementId).setView([33.59, 130.420611], 15);

    new leaflet.TileLayer(
      'https://tile.openstreetmap.jp/{z}/{x}/{y}.png',
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright/">OpenStreetMap</a>'
      }
    )
      .addTo(this.mapInfo);
  }

}
