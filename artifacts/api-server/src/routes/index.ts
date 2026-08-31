import { Router, type IRouter } from "express";
import healthRouter from "./health";
import sessionsRouter from "./sessions";
import instrumentsRouter from "./instruments";
import signalsRouter from "./signals";
import positionsRouter from "./positions";
import tradesRouter from "./trades";
import ordersRouter from "./orders";
import walletRouter from "./wallet";
import settingsRouter from "./settings";
import dashboardRouter from "./dashboard";

const router: IRouter = Router();

router.use(healthRouter);
router.use(sessionsRouter);
router.use(instrumentsRouter);
router.use(signalsRouter);
router.use(positionsRouter);
router.use(tradesRouter);
router.use(ordersRouter);
router.use(walletRouter);
router.use(settingsRouter);
router.use(dashboardRouter);

export default router;
