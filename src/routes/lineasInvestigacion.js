const router = require("express").Router();
const Investigacion = require("../models/Investigacion");

const {
//   verifyToken,
//   verifyTokenAndAuthorization,
//   verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

//CREATE Investigacion

router.post("/",  async (req, res) => {
  const newInvestigacion = new Investigacion(req.body);
  try {
    const savedInvestigacion = await newInvestigacion.save();
    res.status(200).json(savedInvestigacion);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE Investigacion
router.put("/:id",  async (req, res) => {
  try {
    const updatedInvestigacion = await Investigacion.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedInvestigacion);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id",  async (req, res) => {
  try {
    await Investigacion.findByIdAndDelete(req.params.id);
    res.status(200).json("Investigacion has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Investigacion
router.get("/find/:id", async (req, res) => {
  try {
    const Investigacion = await Investigacion.findById(req.params.id);
    Investigacion.size.unshift("Escoge un número");
    res.status(200).json(Investigacion);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL Investigacion
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  const qAsc = req.query.asc;
  const qDsc = req.query.dsc;

  try {
    let Investigacions;
    if (qCategory && qNew) {
      Investigacions = await Investigacion.find({
        categories: {
          $in: [qCategory],
        },
      }).sort({ createdAt: -1 });
    } else if (qCategory && qAsc) {
      Investigacions = await Investigacion.find({
        categories: {
          $in: [qCategory],
        },
      }).sort({ price: 1 });
    } else if (qCategory && qDsc) {
      Investigacions = await Investigacion.find({
        categories: {
          $in: [qCategory],
        },
      }).sort({ price: -1 });
    } else {
      Investigacions = await Investigacion.find();
    }
    res.status(200).json(Investigacions);
  } catch (err) {
    res.status(500).json(err);
  }
});

//SEARCH PRODUCT - AUTOCOMPLETE
// router.get("/search", async (req, res) => {
//   try {
//     const title = req.query.title;
//     const agg = [
//       {
//         $search: {
//           index: "productsIndex",
//           autocomplete: {
//             query: title,
//             path: "title",
//             fuzzy: {
//               maxEdits: 2,
//             },
//           },
//         },
//       },
//       {
//         $limit: 5,
//       },
//       {
//         $project: {
//           _id: 1,
//           title: 1,
//           desc: 1,
//           price: 1,
//           img: 1,
//           inStock: 1,
//         },
//       },
//     ];
//     const response = await Product.aggregate(agg);
//     if (response.length > 0) {
//       return res.status(200).json(response);
//     } else {
//       return res.json("No se ha encontrado ningun producto con este criterio");
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json(error);
//   }
// });

// router.get("/search/category", async (req, res) => {
//   try {
//     const title = req.query.title;
//     const category = req.query.category;
//     const agg = [
//       {
//         $search: {
//           index: "productsIndex",
//           autocomplete: {
//             query: title,
//             path: "title",
//             fuzzy: {
//               maxEdits: 2,
//             },
//           },
//         },
//       },
//       {
//         $limit: 5,
//       },
//       {
//         $match: {
//           categories: category,
//         },
//       },
//       {
//         $project: {
//           _id: 1,
//           title: 1,
//           desc: 1,
//           price: 1,
//           img: 1,
//           inStock: 1,
//         },
//       },
//     ];
//     const response = await Product.aggregate(agg);
//     return res.json(response);
//   } catch (error) {
//     console.log(error);
//     return res.json([]);
//   }
// });

module.exports = router;
