import testModel from "../../utils/models/testModel.js";

const handler = {
	get: async (req, res) => {
		const apples = req.query["apples"] || 0;

		if (apples > 0) {
			let data = await testModel.findOne();
			if (!data) {
				data = new testModel({
					apples: apples,
				});
				await data.save();
				return res.send(JSON.stringify(data, null, 2));
			}

			data.apples = apples;
			await data.save();
			return res.send(JSON.stringify(data, null, 2));
		}

		const documents = await testModel.find();
		return res.send(documents.length > 0 ? documents : "No documents :(");
	},
};

export default handler;
