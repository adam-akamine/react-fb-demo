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
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentForm />
        <CommentList
          data = { this.props.data }
        />
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox data = { data } />,
  document.getElementById('app')
);