const mongoose = require("mongoose")
const moment = require("../controller/moment")

const CommentSchema = new mongoose.Schema(
  {
    //post: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
    userId: { type: Number, required: false },
    writer: { type: String, required: false },
    postNumber: { type: Number, required: false },
    content: { type: String, required: true },
    isDeleted: {
      //나중에 대댓글 구현 위해서 실제 데이터를 삭제하는 게 아니라 isDeleted를 true로 바꿔주는 방식으로 삭제
      type: Boolean,
      default: false,
    },
    depth: {
      //대댓글 구현 위한 depth 설정
      type: Number,
      default: 1,
    },
    date: { type: String, required: false },
  },
  { versionKey: false }
)

CommentSchema.pre("save", function () {
  this.date = moment.dateNow()
})

module.exports = mongoose.model("comment", CommentSchema)
