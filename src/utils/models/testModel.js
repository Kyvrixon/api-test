import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
	{
		_id: Number,
		apples: Number,
	},
	{
		_id: false,
		versionKey: false,
		skipVersioning: true,
	}
);

testSchema.pre("save", async function (next) {
	if (this.isNew) {
		const count = await mongoose.models.test.countDocuments();
		this._id = count + 1;
	}
	next();
});

const test = mongoose.models.test || mongoose.model("test", testSchema);

export default test;
