const GAME_ENGINE = new GameEngine();
const ASSET_MANAGER = new AssetManager();
const SCENE_MANAGER = new SceneManager("")
const FRAME_WIDTH = 500
const FRAME_HEIGHT = 900

ASSET_MANAGER.queueDownload("./assets/Title.jpg")
ASSET_MANAGER.queueDownload("./assets/1.28 goofy ahh ahh game fade.mp3")
ASSET_MANAGER.queueDownload("./assets/crunchy vine boom.mp3")
ASSET_MANAGER.queueDownload("./assets/jump.mp3")
ASSET_MANAGER.queueDownload("./assets/land.mp3")

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	GAME_ENGINE.init(ctx);

	//Scene
	SCENE_MANAGER.loadLevel("title")

	GAME_ENGINE.start();
});
