import * as leaflet from 'leaflet';

import { Component, inject, OnInit, signal } from '@angular/core';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';

import { MapService } from './services/map.service';

@Component({
  selector: 'app-root',
  imports: [
    MatSlideToggleModule,
    MatToolbarModule,
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  private mapService = inject(MapService);

  /** マップ情報。 */
  private map?: leaflet.Map;

  /** マップタイルレイヤー。 */
  private tileLayer?: leaflet.TileLayer;

  /** マーカーレイヤー。 */
  private markerLayer?: leaflet.MarkerClusterGroup;

  /** マップ表示対象のエレメントID。 */
  private readonly mapElementId: string = 'mapInfo';

  protected readonly title = signal<string>('angular-leaflet-sample');

  /** マーカーレイヤーの表示可否を決める。 */
  public showMarkerLayer = signal<boolean>(true);

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

        for (const station of stations) {
          this.markerLayer.addLayer(this.mapService.createMaker(station, this.markerLayer, 'train'));
        }

        this.map.addLayer(this.markerLayer);

        this.mapService.addClickEventForMap(this.map, this.markerLayer);
      });
  }

  /**
   * マーカーレイヤーの表示、非表示を切り替える。
   * @param event イベントデータ。
   */
  public onShowMarkerChange(event: MatSlideToggleChange): void {
    this.showMarkerLayer.set(event.checked);
    if (this.map != null && this.markerLayer != null) {
      if (event.checked) {
        this.map.addLayer(this.markerLayer);
      }
      else {
        this.map.removeLayer(this.markerLayer);
      }
    }
  }

}
