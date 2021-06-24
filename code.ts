figma.showUI(__html__,{ width: 280, height: 240 })

figma.ui.onmessage = sizes => {

	var mirrorPPI = (Math.sqrt(Math.pow(sizes['mirror-width'],2) + Math.pow(sizes['mirror-height'],2))) / sizes['mirror-inch'];

	// c: new target-inch, in pixel
	var c = sizes['target-inch'] * mirrorPPI;
	// target size on mirror vs. actual target size
	var ratio = c / (Math.sqrt(Math.pow(sizes['target-width'],2) + Math.pow(sizes['target-height'],2)));
	// a: new target-width, b: new target-height, in pixel
	var a = sizes['target-width'] * ratio;
	var b = sizes['target-height'] * ratio;
	
	const nodes: FrameNode[] = [];
	const mirror = figma.createFrame();
	mirror.resizeWithoutConstraints(sizes['mirror-width'], sizes['mirror-height'])
	mirror.x = 150;
	mirror.fills = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
	figma.currentPage.appendChild(mirror);
	nodes.push(mirror);
	figma.currentPage.selection = nodes;
	figma.viewport.scrollAndZoomIntoView(nodes);

	const target = figma.createRectangle();
	target.resizeWithoutConstraints(a,b)
	target.x = 20;
	target.y = 20;
	target.fills = [{type: 'SOLID', color: {r: 0.5, g: 0.5, b: 0.5}}];
	mirror.appendChild(target);

	// close
	// figma.closePlugin();
}

