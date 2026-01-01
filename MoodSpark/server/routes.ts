import express from "express";
import { db } from "./database.js";
import { randomUUID } from "crypto";

const router = express.Router();

router.post("/api/moods", async (req: express.Request, res: express.Response) => {
  try {
    const { mood } = req.body;
    
    if (!mood) {
      res.status(400).json({ error: "Mood is required" });
      return;
    }

    const id = randomUUID();
    const timestamp = Date.now();

    await db.insertInto('moods')
      .values({ id, mood, timestamp })
      .execute();

    console.log(`Mood recorded: ${mood} at ${new Date(timestamp).toISOString()}`);
    
    res.status(201).json({ id, mood, timestamp });
  } catch (error) {
    console.error('Error recording mood:', error);
    res.status(500).json({ error: 'Failed to record mood' });
  }
});

router.get('/api/moods', async (req: express.Request, res: express.Response) => {
  try {
    const moods = await db.selectFrom('moods')
      .selectAll()
      .orderBy('timestamp', 'desc')
      .execute();

    console.log(`Retrieved ${moods.length} mood entries`);
    res.json(moods);
  } catch (error) {
    console.error('Error retrieving moods:', error);
    res.status(500).json({ error: 'Failed to retrieve moods' });
  }
});

export default router;
