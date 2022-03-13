import 'leaflet.markercluster';

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
   * @param markerLayer マーカーレイヤー。
   * @returns マーカー。
   */
  public createMaker(facility: Facility, markerLayer: leaflet.MarkerClusterGroup): leaflet.Marker {
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

    this.addDoubleClickEventForMarker(marker, markerLayer);

    // マーカークリック時に表示するポップアップを設定する。
    let contentHTML: string = '';
    contentHTML += '<div style="display: flex;">';
    contentHTML += '    <div>';
    contentHTML += '        <img src="assets/marker-icon.png" />';
    contentHTML += '    </div>';
    contentHTML += '    <div>';
    contentHTML += '        <span>' + facility.name + '</span>';
    contentHTML += '        <table>';
    contentHTML += '            <tbody>';
    contentHTML += '                <tr>';
    contentHTML += '                    <td>緯度</td>';
    contentHTML += '                    <td>' + facility.coordinate.lat.toString() + '</td>';
    contentHTML += '                </tr>';
    contentHTML += '                <tr>';
    contentHTML += '                    <td>緯度</td>';
    contentHTML += '                    <td>' + facility.coordinate.lng.toString() +'</td>';
    contentHTML += '                </tr>';
    contentHTML += '            </tbody>';
    contentHTML += '        </table>';
    contentHTML += '    </div>';
    contentHTML += '</div>';

    const popup: leaflet.Popup = new leaflet.Popup(
      {
        closeButton: true,
      }
    )
      .setLatLng(facility.coordinate)
      .setContent(contentHTML);

    marker.bindPopup(popup);

    return marker;
  }

  /**
   * マップにクリックイベントを追加する。
   *
   * @param map クリックイベント追加対象のマップ。
   * @param markerLayer マーカーを追加するレイヤー。
   */
  public addClickEventForMap(map: leaflet.Map, markerLayer: leaflet.MarkerClusterGroup): void {
    if ((map == null) || (markerLayer == null)) {
      return;
    }

    // マップクリック時に新しいマーカーを追加する。
    map.on('click', (e: leaflet.LeafletMouseEvent) => {
      const facility: Facility = new Facility('', new leaflet.LatLng(e.latlng.lat, e.latlng.lng));

      markerLayer.addLayer(this.createMaker(facility, markerLayer));
    });
  }

  /**
   * マーカーにダブルクリックイベントを追加する。
   *
   * @param marker 追加対象のマーカー。
   * @param markerLayer マーカーレイヤー。
   */
  private addDoubleClickEventForMarker(marker: leaflet.Marker, markerLayer: leaflet.MarkerClusterGroup): void {
    if ((marker == null) || (markerLayer == null)) {
      return;
    }

    // マーカーダブルクリック時に対象マーカーを削除する。
    marker.on('dblclick', () => {
      markerLayer.removeLayer(marker);
      marker.remove();
    });
  }
}
