import React from "react";

class Profile extends React.Component {
  constructor(props) {
    super(props);

  }

  // componentWillMount() {
  //   console.log(this.props.currentUser.id);
  //   this.props.fetchUserTweets(this.props.currentUser.id);
  // }

  // componentWillReceiveProps(newState) {
  //   this.setState({ tweets: newState.tweets });
  // }

  render() {
    return (
      <div>
        <h1>Hello from Profile!</h1>
      </div>
    )
  }
}

export default Profile;
