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
  render: function() {
    var md = new Remarkable();
    return (
      <div className = "comment">
        <h2 className = "commentAuthor">
          {this.props.author}
        </h2>
        <p>
          {this.props.children}
        </p>
        { md.render(this.props.children.toString()) }
      </div>
    );
  }
});

const CommentList = React.createClass({
  render: function() {
    return (
      <div className = "commentList">
        <Comment author = "Tony">Wow, so awesome</Comment>
        <Comment author = "Jesse">Iknowrite</Comment>
      </div>
    );
  }
});

const CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <CommentForm />
        <CommentList />
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox />,
  document.getElementById('app')
);