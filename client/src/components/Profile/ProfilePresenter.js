import React, {Fragment} from 'react';
import Feed from './ProfileFeed/ProfileFeed';
import ProfileHeaderContainer from './ProfileHeader/ProfileHeaderContainer';
import Footer from '../Footer/Footer';

class Profile extends React.Component{
  componentDidMount(){
    console.log(this.props.match.params.username)
  }
  render(){
    return(
      <Fragment>
        <ProfileHeaderContainer username={this.props.match.params.username}/>
        <Feed username={this.props.match.params.username}/>
        <Footer />
      </Fragment>
    );
  }
}

export default Profile;
