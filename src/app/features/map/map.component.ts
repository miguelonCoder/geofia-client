import { Component } from '@angular/core';
import { GeoJSONSourceComponent, LayerComponent, MapComponent, MarkerComponent } from '@maplibre/ngx-maplibre-gl';

@Component({
  selector: 'app-map',
  imports: [MapComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class Map {

}
