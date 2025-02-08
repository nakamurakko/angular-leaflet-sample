import * as leaflet from 'leaflet';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';

import { MapService } from './services/map.service';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  public title: string = 'angular-leaflet-sample';

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
    this.mapService.getStations()
      .subscribe(stations => {
        this.map = new leaflet.Map(this.mapElementId).setView(stations[0].coordinate, 15);
        this.tileLayer = new leaflet.TileLayer(
          'https://tile.openstreetmap.jp/{z}/{x}/{y}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright/">OpenStreetMap</a>'
          }
        );
        this.map.addLayer(this.tileLayer);

        this.markerLayer = new leaflet.MarkerClusterGroup();

        for (let i: number = 0; i < stations.length; i++) {
          this.markerLayer.addLayer(this.mapService.createMaker(stations[i], this.markerLayer, 'train'));
        }

        this.map.addLayer(this.markerLayer);

        this.mapService.addClickEventForMap(this.map, this.markerLayer);
      });
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
