const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const Anchor = require("../../modules/Anchors");
const auth = require("../../middleware/auth");
const { validateError, serverError } = require("../../middleware/errors");
const Anchors = require("../../modules/Anchors");

//@route GET api/anchors
//@desc get all anchors for authenticated user
//@accsess Private
router.get("/", auth, async (req, res) => {
  try {
    const anchors = await Anchors.find({ user: req.user.id });
    res.json(anchors);
  } catch (err) {
    serverError(err, res);
  }
});

//@route POST api/anchors
//@desc create an anchor
//@accsess Private
router.post(
  "/",
  [
    auth,
    [
      body("title", "Title is required").notEmpty(),
      body("color", "Please choose a color for your anchor item").notEmpty(),
    ],
    validateError,
  ],
  async (req, res) => {
    const { title, color, from, to } = req.body;
    try {
      const anchors = await Anchors.find({ user: req.user.id });
      let anchor = anchors.find((anchor) => anchor.title === title);
      if (anchor) {
        return res.status(400).json({ msg: "Anchor already exists" });
      }

      anchor = new Anchor({
        user: req.user.id,
        title,
        color,
        from,
        to,
      });

      await anchor.save();
      res.json(anchor);
    } catch (err) {
      serverError(err, res);
    }
  }
);

//@route GET api/anchors/:anchorId
//@desc get anchor by id
//@accsess Private
router.get("/:anchorId", auth, async (req, res) => {
  try {
    const anchor = await Anchors.findById(req.params.anchorId);
    if (!anchor || anchor.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: "Anchor not found" });
    }
    res.json(anchor);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Anchor not found" });
    }
    serverError(err, res);
  }
});

//@route PUT api/anchors/:anchorId
//@desc mordify anchor's title/color/to
//@accsess Private
router.put("/:anchorId", auth, async (req, res) => {
  const { title, color, from, to } = req.body;
  try {
    const anchor = await Anchors.findById(req.params.anchorId);
    if (title) anchor.title = title;
    if (color) anchor.color = color;
    if (from) anchor.from = from;
    if (to) anchor.to = to;

    await anchor.save();
    res.json(anchor);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Anchor not found" });
    }
    serverError(err, res);
  }
});

//@route DELETE api/anchors/:anchorId
//@desc delete an anchor
//@accsess Private
router.delete("/:anchorId", auth, async (req, res) => {
  try {
    const anchor = await Anchors.findById(req.params.anchorId);

    if (!anchor || anchor.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: "Anchor not found" });
    }

    await anchor.deleteOne();

    res.json({ msg: "Anchor removed" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Anchor not found" });
    }
    serverError(err, res);
  }
});

//@route PUT api/anchors/record/:anchorId
//@desc add record for anchor
//@accsess Private
router.put(
  "/record/:anchorId",
  [
    auth,
    [
      body("text", "How's your anchor running today").notEmpty(),
      body("rate", "Please give a rate for your anchor today").notEmpty(),
    ],
    validateError,
  ],
  async (req, res) => {
    try {
      const anchor = await Anchors.findById(req.params.anchorId);
      if (!anchor || anchor.user.toString() !== req.user.id) {
        return res.status(404).json({ msg: "Anchor not found" });
      }

      const newRecord = {
        rate: req.body.rate,
        text: req.body.text,
      };
      anchor.records.push(newRecord);

      await anchor.save();
      res.json(anchor.records);
    } catch (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "Anchor not found" });
      }
      serverError(err, res);
    }
  }
);

//@route PUT api/anchors/record/:anchorId/:recordId
//@desc update record
//@accsess Private
router.put("/record/:anchorId/:recordId", auth, async (req, res) => {
  try {
    const anchor = await Anchors.findById(req.params.anchorId);
    if (!anchor || anchor.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: "Anchor not found" });
    }

    let record = anchor.records.find(
      (record) => record.id === req.params.recordId
    );
    if (!record) {
      return res.status(404).json({ msg: "Record not found" });
    }

    record.text = req.body.text;

    await anchor.save();
    res.json(anchor.records);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Anchor not found" });
    }
    serverError(err, res);
  }
});

//@route DELETE api/anchors/record/:anchorId/:recordId
//@desc delete a record
//@accsess Private
router.delete("/record/:anchorId/:recordId", auth, async (req, res) => {
  try {
    const anchor = await Anchors.findById(req.params.anchorId);
    if (!anchor || anchor.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: "Anchor not found" });
    }

    const record = anchor.records.find(
      (record) => record.id === req.params.recordId
    );
    if (!record) {
      return res.status(404).json({ msg: "Record not found" });
    }

    const removeIndex = anchor.records.indexOf(req.params.recordId);
    anchor.records.splice(removeIndex, 1);
    await anchor.save();

    res.json(anchor.records);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Anchor not found" });
    }
    serverError(err, res);
  }
});

module.exports = router;
