import 'leaflet.markercluster';

import * as leaflet from 'leaflet';

import { Component, OnInit } from '@angular/core';

import { Facility } from '../data-types/facility';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-map-layer',
  templateUrl: './map-layer.component.html',
  styleUrls: ['./map-layer.component.css']
})
export class MapLayerComponent implements OnInit {

  private _showMarkerLayer: boolean = true;
  /** マーカーレイヤーの表示可否を決める。 */
  public get showMarkerLayer(): boolean {
    return this._showMarkerLayer;
  }
  public set showMarkerLayer(v: boolean) {
    this._showMarkerLayer = v;
    this.setMarkerLayerVisibility(v);
  }

  /** マップ情報。 */
  public map?: leaflet.Map;

  /** マップタイルレイヤー。 */
  public tileLayer?: leaflet.TileLayer;

  /** マーカーレイヤー。 */
  public markerLayer?: leaflet.MarkerClusterGroup

  /** マップ表示対象のエレメントID。 */
  private readonly mapElementId: string = 'mapInfo';

  public constructor(private mapService: MapService) { }

  public ngOnInit(): void {
    const hakataStation: Facility = new Facility('博多駅', new leaflet.LatLng(33.59, 130.420611));
    this.map = new leaflet.Map(this.mapElementId).setView(hakataStation.coordinate, 15);

    this.tileLayer = new leaflet.TileLayer(
      'https://tile.openstreetmap.jp/{z}/{x}/{y}.png',
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright/">OpenStreetMap</a>'
      }
    );
    this.map.addLayer(this.tileLayer);

    this.markerLayer = new leaflet.MarkerClusterGroup();
    this.markerLayer.addLayer(this.mapService.createMaker(hakataStation, this.markerLayer));
    this.map.addLayer(this.markerLayer);

    this.mapService.addClickEventForMap(this.map, this.markerLayer);
  }

  /**
   * マーカーレイヤーの表示、非表示を切り替える。
   *
   * @param visible true … 表示する。
   */
  private setMarkerLayerVisibility(visible: boolean): void {
    if (this.map != null && this.markerLayer != null) {
      if (visible) {
        this.map.addLayer(this.markerLayer);
      }
      else {
        this.map.removeLayer(this.markerLayer);
      }
    }
  }
}
