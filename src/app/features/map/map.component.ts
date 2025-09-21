import { Component, computed, inject } from '@angular/core';
import { MapComponent, GeoJSONSourceComponent, LayerComponent  } from '@maplibre/ngx-maplibre-gl';

import { appStore } from '../../state/app-store';
import {bbox} from '@turf/bbox';
import  { FeatureCollection, Geometry } from 'geojson'

@Component({
  selector: 'app-map',
  imports: [MapComponent, GeoJSONSourceComponent, LayerComponent ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class Map {
  store = inject(appStore)
  geometries = computed(() => {
    return this.store.geometries().map(geom => JSON.parse(geom))
  })

  extend = computed(() => {
    if(this.geometries().length > 0){
          const extend = bbox(this.geojson())
    return extend as [number, number, number, number]
    }

    return [-76, 3.4, -76.5, 3.5] as [number, number, number, number]
  })

  geojson = computed<FeatureCollection>(() => ({
    type: 'FeatureCollection',
    features: this.geometries().map((geom, i) => ({
      type: 'Feature',
      geometry: geom as Geometry,  // geom ya es un objeto de tipo Geometry (Point, LineString, Polygon...)
      properties: { id: i }
    }))
  }));
}
