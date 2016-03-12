
var final_degree=1;
var index=160;
var viewer;
var canvas;
var body;
var viewerSettings = {
		cameraEyePosition : [-2.0, -1.5, 1.0],
		cameraCenterPosition : [0.0, 0.0, 0.0],
		cameraUpVector : [0.0, 0.0, 1.0]
};

initialiseCanvas=function(id,task){
	viewer = new JSM.ThreeViewer ();
	canvas = document.getElementById (id);
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;
	viewer.Start (canvas, viewerSettings);
}

createRectangle=function(){

	body = new JSM.Body ();			
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0.0, 0.0, 0.0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (1.0, 0.0, 0.0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (1.0, 0.0, 1.0)));
	body.AddVertex (new JSM.BodyVertex (new JSM.Coord (0.0, 0.0, 1.0)));

	body.AddPolygon (new JSM.BodyPolygon ([0, 1, 2, 3]));
	return body;

}

rotate=function(){
	var transformation;
	for(degree = final_degree; degree < final_degree+0.2; degree+=0.02){
		transformation = JSM.RotationZTransformation (degree,new JSM.Coord (0,0,0));
		body.Transform (transformation);
		AddBodyToViewer (body);
	}
	final_degree=degree;
}

createCircle = function(){
	AddBodyToViewer(new JSM.GenerateCuboid(1.0,1.0,1.0));

}

AddBodyToViewer=function(body)
{
	var meshes = JSM.ConvertBodyToThreeMeshes (body);
	viewer.AddMeshes (meshes);	
	viewer.Draw();		
}
removeMeshes=function(){
	viewer.RemoveMeshes ();
}

slice=function(){
	initialiseCanvas("example");
	var cylinderBody = JSM.GenerateCylinder (0.5, 1,100,true, false);
	var cutBody=JSM.GenerateCuboid(1,0.05,1);
	var newBody=JSM.BooleanOperation("Difference",cylinderBody,cutBody);
	AddBodyToViewer(newBody);
}

smash=function(){
	removeMeshes();
	var pie1 = JSM.GeneratePie(0.5,1,index* JSM.DegRad,500,true,true);
	var pie2 = JSM.GeneratePie(0.5,1,index* JSM.DegRad,500,true,true);
	var transformation = new JSM.Transformation ();
	transformation = JSM.RotationZTransformation (180* JSM.DegRad,new JSM.Coord (0,0,0));
	pie1.Transform (transformation);
	AddBodyToViewer(pie1);
	AddBodyToViewer(pie2);
	index-=40;
}
