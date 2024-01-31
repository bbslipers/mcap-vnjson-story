// ZIM - https://zimjs.com - Code Creativity!
// JavaScript Canvas Framework for General Interactive Media
// free to use - donations welcome of course! http://zimjs.com/donate

// ZIM PIZZAZZ - see https://zimjs.com/code#libraries for examples

// ~~~~~~~~~~~~~~~~~~~~~~~~
// DESCRIPTION - coded in 2016 (c) ZIM
// Pizzazz is a helper module for ZIM that adds a little design love!
// SEE also Pizzazz 2 for icons

// VERSION 1 - Shapes for Labels, Buttons and Panes
// See the ZIM Bit on Pizzazz for an example: https://zimjs.com/bits/view/pizzazz.html

// import this js file in the top of your code below where you import createjs
// you can get a custom zim.Shape (createjs.Shape with extra members)
// by using pizzazz.makeShape(type, color, width, height)
// and then pass this into the backing parameter in zim.Label, zim.Button or zim.Pane
// and rollBacking parameter in zim.Button
// pizzazz.listShapes() will list your shape options in the console

// DOCS
// Docs are provided at https://zimjs.com/docs.html
// See PIZZAZZ MODULE at bottom

var pizzazz = function(pizzazz) {
	pizzazz.shapes = pizzazz.types = { // types kept for legacy
		menu:[[1.2,1.2],[0,3],"AAJD5InKBGIiBp9IIwCgIJViMIg7Jpg", new createjs.Rectangle(-58,-31.9,116,64)],
		bat:[[1.6,1.7],[-1,2],"ACGCYIiKBVIh9g3ImkBaQgej8D/keICLBzIA3AuIA3haIBCBAIAghAIBMBPIBPg5IBlhiQELEjAHD8g", new createjs.Rectangle(-55.3,-27.2,110.8,54.5)],
		lips:[[1.6,1.6],[1,1],"AjpC+QhYgnhwhtIhvgKQAohMBZhNQBghTBWgRQBQgPBEAZQA6AWAgArQBnhgB+AfQBiAYBUBCQBBA0BABRIhMAUQh+B8huAnQhKAbiYAFIgeABQh7AAhXgmg", new createjs.Rectangle(-54.5,-22.8,109,45.7)],
		magnet:[[1.2,1.2],[0,0],"AE2E9IprAAQhrAAgZhSIgBgFQh0gDAAh5IAAjKQAAh3BygGIAAgDIAAAAQAWhcBxAAIJrAAQBwAAAWBcIABADQByAGAAB3IAADKQAAB4hzAEIgCAFIAAABQgaBRhqAAIAAAAgAk1EfIJrAAQBPAAAXg4Is2AAQAWA4BPAAgAmejdIM8AAQgThBhVAAIprAAQhVAAgUBBg", new createjs.Rectangle(-56,-31.7,112,63.5)],
		stash:[[1.6,1.4],[-2,-3],"AlQkKIFPBBIEMhGIEnILIlZhaImOAAIl8Bug", new createjs.Rectangle(-56.2,-27.2,112.5,54.5)],
		bolt:[[1.5,1.5],[-10,-1],"ApCiYIFZiqIDQClICwiOIGsIlIAAABIl9iPIiwClIidhcIjhCOg", new createjs.Rectangle(-57.9,-32.3,115.9,64.7)],
		cloud:[[1.2,1.2],[0,2],"AjwEzQg7gdgXgkQgyAahBAAQhNAAg3glQg2gkAAg0QAAg0A2glQASgMAVgIQgPgiAAgmQAAhXBFg/QBDg9BggBQAuAAAoAPQAMgfAWgbQA1g+BJAAQBJAAAzA+QAUAYAMAbQAugmA+AAQBCAAAuAoQAuAoABA3QAqgZA1AAQBIAAAzAtQAzAugBBBQABA/gzAuQgRAPgTAJQADAOAAAOQAAA7g2AqQg2AqhNAAQgpAAgjgMQgUAQgcANQhiAxiJAAQiLAAhigxg", new createjs.Rectangle(-62.5,-35.6,125,71.3)],
		pow:[[1.2,1.2],[4,3],"AA4EOIjACuIh9i5IkZBAIB/j6Ikoi3IFygnIihj9IGWC8ICPjlICvELIFojnIhQFJIDSBgIjNB4IBBDpIkYhwIgoC5g", new createjs.Rectangle(-71.2,-44.4,142.5,88.9)],
		drip:[[1.3,1.3],[0,0],"AmhEFQhPgxgrg6Qg0hHAAhTQAAhSA0hGQArg6BPgxQCuhuDzABQD1gBCtBuQCuBsAACXQAACZiuBsQitBtj1gBQjzABiuhtgAl0joQibBhAACHQAACJCbBgQCcBhDYAAQDaAACchhQCbhgAAiJQAAiHibhhQichgjaAAQjYAAicBggAkqC7Qh7hNAAhuQAAhrB7hNQB8hOCuAAQCvAAB7BOQB9BNAABrQAABuh9BNQh7BNivAAQiuAAh8hNg", new createjs.Rectangle(-59.2,-37,118.4,74)],
		drop:[[1.5,1.5],[0,0],"AkdEeQh3h3AAinQAAimB3h2QB3h4CmAAQCnAAB3B4QB3B2AACmQAACnh3B3Qh3B3inAAQimAAh3h3gAj+j+QhqBrAACTQAACVBqBqQBrBrCTgBQCVABBqhrQBrhqgBiVQABiThrhrQhqhqiVAAQiTAAhrBqgAjMDMQhThUAAh4QAAh2BThUQBWhVB2AAQB3AABVBVQBVBUAAB2QAAB4hVBUQhVBVh3AAQh2AAhWhVg", new createjs.Rectangle(-40.5,-40.5,81,81)],
		circle:[[1.3,1.3],[0,0],"Aj3D2QhlhlgBiRQABiQBlhlQBnhoCQAAQCRAABlBoQBoBlAACQQAACRhoBlQhlBoiRAAQiQAAhnhog", new createjs.Rectangle(-35,-35,70,70)],
		folds:[[1,1.2],[-1,0],"AiiDuIj9BMIjshMIAApBIDyBNIEIhNIEoBnID0hnIEBBAIAAJAIklg/IjnBmg", new createjs.Rectangle(-65.2,-34,130.5,68.1)],
		oval:[[1.15,1.15],[0,0],"AmTDTQhBgigogoQg/g+AAhLQAAhLA/g+QAogoBBgjQCnhWDsAAQDsAACnBWQCpBZAAB7QAAB7ipBYQinBZjsgBQjsABinhZg", new createjs.Rectangle(-57.2,-30,114.5,60)],
		kidney:[[1.4,1.4],[-2,-1],"ADGDjQiRhfh+BaQiBBbiRhZQiQhYA0inQA0ipC6gzQC6gzCqBIQCrBJBUCJQBTCHhMBoQgnA2g6AAQg1AAhFgug", new createjs.Rectangle(-45.4,-27.3,90.8,54.7)],
		boom:[[1.5,1.5],[-3,7],"Ai1ETQhyg9hFhpQhFhqgfjOQgfjQD+CpQD8CpCzgKQCzgKBMAfQBMAfivCeQivCgh4AYQgiAHggAAQhVAAhRgrg", new createjs.Rectangle(-46.9,-31.9,93.8,63.8)],
		roadside:[[1.1,1.1],[1,-1],"AHCEuQlCgjoggDQhGgLgpgeQg8gsgJhaIgGhGIgMiYQADhOAzghQAcgTBAgJQBggOFAgKQFggLC3ANQCBgEADCAIgSCgIgXC0QgHBIggAhQgcAbgwAAIgJAAg",new createjs.Rectangle(-61.6,-30.3,123.2,60.6)]
	}

	pizzazz.makeShape = function(type, color, width, height) {
		if (zot(type)) type = "cloud";
		type = type.toLowerCase();
		if (zot(color)) color = "black";
		var data = pizzazz.shapes[type];
		if (zot(data)) data = pizzazz.shapes["cloud"];
		var sX = data[0][0]; // scale adjust
		var sY = data[0][1];
		var rX = data[1][0]; // registration point adjust
		var rY = data[1][1];
		var rect = data[3];
		var scaleX = 1;
		var scaleY = 1;
		if (zot(width) && zot(height)) {
			width = rect.width*sX;
			height = rect.height*sY;
		} else if (zot(width)) {
			width = height / rect.height * rect.width;
			// height is what is provided
		} else if (zot(height)) {
			height = width / rect.width * rect.height;
			// width is what is provided
		}
		scaleX = width / rect.width;
		scaleY = height / rect.height;

		var shape = new zim.Shape();
		shape.setBounds(rect.x, rect.y, rect.width, rect.height);
		shape.regX = rX;
		shape.regY = rY;
		shape.graphics.f(color).p(data[2]);
		shape.scaleX = scaleX;
		shape.scaleY = scaleY;
		shape.type = type;
		return shape;
	}

	pizzazz.listShapes = function() {
		for (var p in pizzazz.shapes) {
			zog(p);
		}
	}
	return pizzazz;
}(pizzazz || {});
