const { getMaxListeners } = require("connect-mongo");
const nodeMailer = require("../config/nodemailer");

// this is another way of exporting a method
exports.newComment = async (comment) => {
  let htmlString = nodeMailer.renderTemplate(
    { comment: comment },
    "/comments/new_comment.ejs"
  );
  //  const comments = await comment.populate({path:'post', populate:{path:'user', select:'email'}})
  //  console.log(comments)
  nodeMailer.transporter.sendMail(
    {
      from: "chitranjankumarpatel8@gmail.com",

      // to: comments.post.user.email,

      to: comment.user.email,

      // to:"chitranjanue185028ece@gmail.com",
      
      subject: "New Comment Published!",
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending mail", err);
        return;
      }

      console.log("Message sent", info);
      return;
    }
  );
};
