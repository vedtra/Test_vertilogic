import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';


class ContentFeed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'items': [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }
   onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }
  componentDidMount() {
    this.getItems();
  }

  getItems() {
    fetch('http://jsonplaceholder.typicode.com/users')
    .then(results => results.json())
    .then(results => this.setState({'items': results}));
  }
  render() {


    const styles = {
        
        margin: '40px',
        border: '5px solid black'
        };

    const regar={
       fontsize:'20px',
       color:'blue'

    };

    const style = {
      width: '50vw',
      height: '75vh',
      'marginLeft': 'auto',
      'marginRight': 'auto'
    };

    return (
      <ul style={styles}>
      <Map
        item
        xs = { 12 }
        style = { style }
        google = { this.props.google }
        onClick = { this.onMapClick }
        zoom = { 14 }
        initialCenter = {{ lat: -37.3159, lng: 81.1496 }}
      >
        <Marker
          onClick = { this.onMarkerClick }
          title = { 'Changing Colors Garage' }
          position = {{ lat: -37.3159, lng: 81.1496 }}
          name = { 'Changing Colors Garage' }
        />
        <InfoWindow
          marker = { this.state.activeMarker }
          visible = { this.state.showingInfoWindow }
        >
        </InfoWindow>
      </Map>
 

        {this.state.items.map(function(item, index) {
          return(
          		<div key={item.id}>
              <img src="https://www.goaltos.com/wp-content/uploads/sites/4559/2018/01/avatar-1577909_960_720.png"  alt="" class="img-rounded" width="100" />
          		<h5>{item.name}</h5>
              <p>{item.username}</p>
              <p>{item.phone}</p>
              <p style={regar}>{item.email}</p>


          		</div>
          	)
        })}

      </ul>

    );
  }
}

export default GoogleApiWrapper({
    api: (process.env.AIzaSyCAy127FZDLhVhdUDz_V5qecYshX9NKjDw)
})(ContentFeed)

ReactDOM.render(
  <ContentFeed />,
  document.getElementById('root')
);