import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';
import ReactAudioPlayer from 'react-audio-player';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('boards');
    this.unsubscribe = null;
    this.state = {
      boards: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
      const { title, author, image, music } = doc.data();
      boards.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        author,
        image,
        music,
      });
    });
    this.setState({
      boards
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 style={{textAlign:"center", marginTop:"5%"}} class="panel-title">
              SONG LIST
            </h3>
          </div>
          <div style={{marginTop:"10%"}} class="panel-body">
          <h4 style={{textAlign:"right"}}><Link to="/create">Add Song</Link></h4>

            <table class="table">
              <thead>
                  <th>    </th>
                  <th>Artist</th>
                  <th>Title</th>
                  <th>    </th>

              </thead>
              <tbody>
                {this.state.boards.map(board =>
                  <tr>
                    <td><img src="https://files.softicons.com/download/system-icons/lozengue-filetype-icons-by-gurato/png/128/MP3.png"style={{height:"70px"}}/></td>
                    <td style={{verticalAlign:"middle"}}>{board.author}</td>
                    <td style={{verticalAlign:"middle"}}>{board.title}</td>
                    <td><ReactAudioPlayer
                    src={board.music}
                    controls
                      />
                  </td>
                  <td><Link style={{overflow:"hidden"}}to={`/show/${board.key}`}><button class="btn btn-primary" >Edit</button></Link>&nbsp;
                  </td>
                  </tr>
                )}
              </tbody>
            </table>

          </div>

        </div>
      </div>
    );
  }
}

export default App;