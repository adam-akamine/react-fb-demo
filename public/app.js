const CommentForm = React.createClass({
  render: function() {
    return (
      <div className = "commentForm">
        Hello, world! CommentForm!
      </div>
    );
  }
});

const Comment = React.createClass({
  rawMarkup: function () {
    var md = new Remarkable();
    const rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },
  render: function() {
    return (
      <div className = "comment">
        <h2 className = "commentAuthor">
          {this.props.author}
        </h2>
        <span
          dangerouslySetInnerHTML={ this.rawMarkup() }
        />
      </div>
    );
  }
});

const data = [
  {
    author: "Tony",
    text: "Wow, so awesome"
  },
  {
    author: "Jesse",
    text: "Iknowrite"
  }];

const CommentList = React.createClass({
  render: function() {
    const commentNodes = this.props.data.map(function(comment, index) {
      return (
        <Comment
          key = {index}
          author = {comment.author}>
          {comment.text}
        </Comment>
      );
    })
    return (
      <div className = "commentList">
        { commentNodes }
      </div>
    );
  }
});

const CommentBox = React.createClass({
  loadCommentsFromServer: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({data: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function () {
    return {data: []}
  },
  componentDidMount: function () {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentForm />
        <CommentList
          data = { this.state.data }
        />
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox url = "/api/comments" pollInterval = {2000}/>,
  document.getElementById('app')
);