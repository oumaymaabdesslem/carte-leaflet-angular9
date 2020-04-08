import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
 map;
 smallIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
  iconSize:    [25, 41],
  iconAnchor:  [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  shadowSize:  [41, 41]
 });

  constructor() { }

  ngAfterViewInit(): void {
    this.createMap();
  }

  
  createMap(){
    const mallofsousse ={
      lat: 35.903554622281234 ,
      lng:10.543719381093979,
    };
  
    const zoomLevel = 12;
   
    this.map= L.map('map',{
      center :[mallofsousse.lat,mallofsousse.lng],
      zoom:zoomLevel
    });
    
    
    const mainlayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 12,
      maxZoom: 17,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    mainlayer.addTo(this.map);
    const descriptionwikipedia=`
    Mall of Sousse, le nouveau centre commercial et de loisirs du Sahel, 
    représente plusieurs dizaines de millions de dinars d’investissement et 
    quelques milliers d’emplois directs à l’ouverture. Au-delà des chiffres,
   le centre offre une nouvelle dynamique à l’ensemble de la région du Sahel,
   le tout en proposant aux clients une offre intégrée englobant le commercial et le loisir.
    `;
    const popupOptions = {
      coords:mallofsousse,
      text: descriptionwikipedia,
      open: true
    };

     this.addMarker(popupOptions);
  }
   

  addMarker({coords,text,open}){
    const marker = L.marker([coords.lat, coords.lng],{icon:this.smallIcon});
    if(open){
       marker.addTo(this.map).bindPopup(text).openPopup();
    }else {
   marker.addTo(this.map).bindPopup(text);
    }
  }

}
