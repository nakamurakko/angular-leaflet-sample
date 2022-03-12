import * as leaflet from 'leaflet';

import { Injectable } from '@angular/core';

import { Facility } from '../data-types/facility';

/**
 * 地図サービス。
 */
@Injectable({
  providedIn: 'root'
})
export class MapService {

  public constructor() { }

  /**
   * マーカーを生成する。
   *
   * @param facility 施設情報。
   */
  public createMaker(facility: Facility): leaflet.Marker {
    const marker: leaflet.Marker = new leaflet.Marker(
      facility.coordinate,
      {
        icon: new leaflet.Icon(
          {
            iconUrl: 'assets/marker-icon.png',
            shadowUrl: 'assets/marker-shadow.png',
            iconAnchor: new leaflet.Point(13, 41)
          }
        )
      }
    );

    return marker;
  }

  /**
   * マップにクリックイベントを追加する。
   *
   * @param map クリックイベント追加対象のマップ。
   * @param markerLayer マーカーを追加するレイヤー。
   */
  public addClickEventForMap(map: leaflet.Map, markerLayer: leaflet.MarkerClusterGroup):void {
    map.on('click', (e: leaflet.LeafletMouseEvent) => {
      const facility: Facility = new Facility('', new leaflet.LatLng(e.latlng.lat, e.latlng.lng));

      markerLayer.addLayer(this.createMaker(facility));
    });
  }

}
