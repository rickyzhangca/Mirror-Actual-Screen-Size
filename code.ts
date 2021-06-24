figma.showUI(__html__,{ width: 316, height: 420 })

if (figma.currentPage.selection.length > 0) {	
	figma.ui.postMessage([figma.currentPage.selection[0].width,figma.currentPage.selection[0].height]);
}

figma.ui.onmessage = sizes => {

	var mirrorPPI = (Math.sqrt(Math.pow(sizes['mirror-width'],2) + Math.pow(sizes['mirror-height'],2))) / sizes['mirror-inch'];

	// c: new target-inch, in pixel
	var c = sizes['target-inch'] * mirrorPPI;
	// target size on mirror vs. actual target size
	var ratio = c / (Math.sqrt(Math.pow(sizes['target-width'],2) + Math.pow(sizes['target-height'],2)));
	// a: new mirror-width, b: new mirror-height, in pixel
	var a = sizes['mirror-width'] / ratio;
	var b = sizes['mirror-height'] / ratio;
	
	const nodes: FrameNode[] = [];
	const mirror = figma.createFrame();
	mirror.resizeWithoutConstraints(a,b)
	mirror.x = 150;
	mirror.fills = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
	figma.currentPage.appendChild(mirror);
	nodes.push(mirror);
	
	if (figma.currentPage.selection.length === 0) {
		const target = figma.createRectangle();
		target.resizeWithoutConstraints(sizes['target-width'], sizes['target-height'])
		target.x = Math.round((a - sizes['target-width']) / 2);
		target.y = Math.round((b - sizes['target-height']) / 2);
		target.fills = [{type: 'SOLID', color: {r: 0.5, g: 0.5, b: 0.5}}];
		mirror.appendChild(target);
	}
	else {		
		mirror.x = figma.currentPage.selection[0].x;
		mirror.y = figma.currentPage.selection[0].y;
		figma.currentPage.selection[0].x = Math.round((a - sizes['target-width']) / 2);
		figma.currentPage.selection[0].y = Math.round((b - sizes['target-height']) / 2);
		mirror.appendChild(figma.currentPage.selection[0]);
	}

	figma.currentPage.selection = nodes;

	// close
	// figma.closePlugin();
}