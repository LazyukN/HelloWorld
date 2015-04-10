var infoMatrices=
{
	AmatrixNumber:"first",
	BmatrixNumber:"second"

};
document.getElementById("buttonMultiply").onclick=function()
{
	if(infoMatrices.AmatrixNumber==="first")
	{
		matricesMultiply(pushInMassiv('rowInMatrixA'), pushInMassiv('rowInMatrixB'));
	}
	else
	{
		matricesMultiply(pushInMassiv('rowInMatrixB'), pushInMassiv('rowInMatrixA'));		
	}
};

document.getElementById("choiceMatrixA").onclick=function()
{
	choiceMatrix();
};
document.getElementById("choiceMatrixB").onclick=function()
{
	choiceMatrix();
};
document.getElementById("addRow").onclick=function()
{
	addRow(choiceMatrix()[0],choiceMatrix()[1],choiceMatrix()[2]);
};
document.getElementById("addCol").onclick=function()
{
	addCol(choiceMatrix()[0],choiceMatrix()[2]);
};
document.getElementById("deleteRow").onclick=function()
{
	delRow(choiceMatrix()[0]);
};
document.getElementById("deleteCol").onclick=function()
{
	delCol(choiceMatrix()[0]);
};
function choiceMatrix()
{
	var arguments=[];
	var radioA=document.getElementById("choiceMatrixA");
	var radioB=document.getElementById("choiceMatrixB");
	if(radioA.checked)
	{
		arguments[0]="rowInMatrixA";
		arguments[1]="matrixA";
		arguments[2]="a";
		
	}
	if(radioB.checked)
	{
		arguments[0]="rowInMatrixB";
		arguments[1]="matrixB";
		arguments[2]="b";
		
	}
	return arguments;
};

function matricesMultiply(Amatrix,Bmatrix)
{	
	var rowA=Amatrix.length;
	var colA=Amatrix[0].length;
	var rowB=Bmatrix.length;
	var colB=Bmatrix[0].length;
	var matrixC=[];
	var t=0;
	if(colA === rowB)
	{	
		for(var i=0;i<rowA;i++)
		{
			matrixC[i]=[];
			for(var j=0;j<colB;j++)
			{	
				t=0;
				for(var k=0;k<colA;k++)
				{
					t += Amatrix[i][k]*Bmatrix[k][j];
				}
				matrixC[i][j]=t;
			}
		}			
	}
	else changeInterfaceStyle("#f6c1c0","block");
	outputMatrix(matrixC);
	changeInterfaceStyle("#bcbcbc","none");
	return matrixC;
};


function addRow(rowMatrix,matrix,indexNameCel)
{	
	

	var RowMatrix=document.querySelectorAll("."+rowMatrix);
	RowMatrixLength=RowMatrix.length;
	RowMatrixLength+=1;
	if(RowMatrix.length<10)
	{
		var countCol=RowMatrix[0].getElementsByTagName("input").length;
		var matrix=document.getElementById(matrix);
		var newRow=document.createElement("div");
		newRow.className=rowMatrix;
		matrix.appendChild(newRow);
		var newCel=[];
		for(var i=0;i<countCol;i++)
		{	
			var indexCol=i;
			indexCol++;
			newCel[i]=document.createElement("input");
			newCel[i].setAttribute("type","text");
			newCel[i].setAttribute("placeholder",indexNameCel+RowMatrixLength+','+indexCol);
			newRow.appendChild(newCel[i]);
			if(rowMatrix==="rowInMatrixResult")
			{
				newCel[i].setAttribute("disabled","disabled");
			}
			newCel[i].onkeyup=testInput;
		}
		if(infoMatrices.AmatrixNumber==="first")
		{
			if(rowMatrix==="rowInMatrixA") addRow("rowInMatrixResult","matrixResult","c");
		}	
		else
		{
			if(rowMatrix==="rowInMatrixB") addRow("rowInMatrixResult","matrixResult","c")
		}

	}		
}



function addCol(colMatrix,indexNameCel)
{
	
	var ColMatrix=document.querySelectorAll("."+colMatrix);
	var colMatrixlength=ColMatrix[0].getElementsByTagName("input").length;
	var ColMatrixLength=ColMatrix.length;
	var indexCol=colMatrixlength;
	indexCol+=1;
	if(colMatrixlength<10)
	{
		for(var i=0;i<ColMatrixLength;i++)
		{		

			var indexRow=i;
			indexRow++;
			var newCol=document.createElement("input");
			newCol.setAttribute("type","text");
			newCol.setAttribute("placeholder",indexNameCel+indexRow+","+indexCol);
			if(colMatrix === "rowInMatrixResult")
			{
				newCol.setAttribute("disabled","disabled");
			}
			newCol.onkeyup=testInput;
			ColMatrix[i].appendChild(newCol);
		}
		if(infoMatrices.BmatrixNumber==="second")
		{
			if(colMatrix ==="rowInMatrixB") addCol("rowInMatrixResult","c");
		}
		else
		{
			if(colMatrix==="rowInMatrixA") addCol("rowInMatrixResult","c");
		}

	}
}



function delRow(rowMatrix)
{
	var RowMatrix=document.querySelectorAll("."+rowMatrix);
	if(RowMatrix.length>2)
	{
		RowMatrix[RowMatrix.length-1].parentNode.removeChild(RowMatrix[RowMatrix.length-1]);
		if(infoMatrices.AmatrixNumber==="first")
		{
			if(rowMatrix==="rowInMatrixA") delRow("rowInMatrixResult");
		}
		else
		{
			if(rowMatrix==="rowInMatrixB") delRow("rowInMatrixResult");
		}
	}
}



function delCol(rowMatrix)
{
	var RowsMatrix=document.querySelectorAll("."+rowMatrix);
	var RowsMatrixlength=RowsMatrix.length;
	var ColsMatrix=RowsMatrix[0].getElementsByTagName("input").length;
	if(ColsMatrix>2)
	{
		for(var i=0;i<RowsMatrixlength;i++)
		{
			var CelMatrix=RowsMatrix[i].getElementsByTagName("input");
			CelMatrix[CelMatrix.length-1].parentNode.removeChild(CelMatrix[CelMatrix.length-1]);		
		}
		if(infoMatrices.BmatrixNumber==="second")
		{
			if(rowMatrix==="rowInMatrixB") delCol("rowInMatrixResult");
		}
		else
		{
			if(rowMatrix==="rowInMatrixA") delCol("rowInMatrixResult");
		}
	}
}



function pushInMassiv(rowMatrix)
{
	var RowsMatrix=document.querySelectorAll("."+rowMatrix);
	var RowsMatrixlength=RowsMatrix.length;
	var CellsMatrix=[];
	var matrix=[];
	for(var i=0;i<RowsMatrixlength;i++)
	{
		 CellsMatrix[i]=RowsMatrix[i].getElementsByTagName("input");
		 matrix[i]=[];
		 	for(var j=0;j<CellsMatrix[i].length;j++)
		 	{
		 		matrix[i][j]=CellsMatrix[i][j].value;
		 	}	
	}
	return matrix;

}


function outputMatrix(resultMatrix)
{
	var rowsMatrixResult=document.querySelectorAll(".rowInMatrixResult");
	var colsMatrixResult=[];
	for(var i=0;i<rowsMatrixResult.length;i++)
	{
		colsMatrixResult[i]=rowsMatrixResult[i].getElementsByTagName("input");
			for(var j=0;j<colsMatrixResult[i].length;j++)
			{
				colsMatrixResult[i][j].value=resultMatrix[i][j];
			}
	}

}

document.getElementById("clearMatrix").onclick=function ()
{
	var CellsMatrix=document.querySelectorAll('input[type^="text"]');
	for(var i=0;i<CellsMatrix.length;i++)
	{
		CellsMatrix[i].value="";
	}	
	changeInterfaceStyle("#bcbcbc","none");
}


document.getElementById("MatrixChangePlaces").onclick= function() 
{
	var matrixA=document.getElementById("matrixA");
	var childrenMatrixA=matrixA.children;
	var childrenMatrixALength=childrenMatrixA.length;
	var matrixB=document.getElementById("matrixB")
	var childrenMatrixB=matrixB.children;
	childrenMatrixBLength=childrenMatrixB.length;
	for(var i=0;i<childrenMatrixALength;i++)
	{
		

		matrixB.appendChild(childrenMatrixA[0]);
		
	}
	for(var i=0;i<childrenMatrixBLength;i++)
	{

		matrixA.appendChild(childrenMatrixB[0]);
		
	}
	matrixA.id="matrixB";
	matrixB.id="matrixA";
	var nameMatrixA=document.querySelectorAll(".nameMatrixA");
	var nameMatrixB=document.querySelectorAll(".nameMatrixB");
	nameMatrixA[0].className="nameMatrixB";
	nameMatrixB[0].className="nameMatrixA";
	if(infoMatrices.AmatrixNumber==="first"&&infoMatrices.BmatrixNumber==="second")
	{
		infoMatrices.AmatrixNumber="second";
		infoMatrices.BmatrixNumber="first";
	}
	else
	{
		infoMatrices.AmatrixNumber="first";
		infoMatrices.BmatrixNumber="second";
	}
	newMatrixResult();


}


window.onload=function test()
{
	var input=document.querySelectorAll("input[type='text']");
	for(var i=0;i<input.length;i++)
	{

		input[i].onkeyup=testInput;
	}	
}



function testInput()
{
	
	changeInterfaceStyle("#5199db","none");
	var input=document.querySelectorAll("input[type='text']");
	var values=[];
	for(var i=0;i<input.length;i++)
	{
		values[i]=input[i].value;

	}
	var rep=/[^\d]|.../;
	for(var i=0;i<input.length;i++)
		if(rep.test(values[i]))
		{
			
			values[i]=values[i].replace(rep,"");
			input[i].value=values[i];
			
		}
	for(var i=0;i<input.length;i++)
	{
		if(values[i]>10)
		{
			values[i]=values[i].slice(0,-1);
			input[i].value=values[i];
		}
	}

}



function changeInterfaceStyle(color,display)
{
	var changeInterface=document.getElementById("interface");
	changeInterface.style.background=color;
	var changeButton=document.getElementById("buttonMultiply");
	changeButton.style.backgroundColor=color;
	var errorMessage=document.getElementById("error");
	errorMessage.style.display=display;

}

function newMatrixResult () 
{
	var rowsMatrixResult=document.querySelectorAll(".rowInMatrixResult");
	var rowsMatrixResultLength=rowsMatrixResult.length;
	if(rowsMatrixResultLength>2)
	{
		for(var i=rowsMatrixResultLength;i>2;i--)
		{	
			delRow("rowInMatrixResult");
		}
	}
	var colsMatrixResult=rowsMatrixResult[0].getElementsByTagName("input");
	var colsMatrixResultLength=colsMatrixResult.length;
	if(colsMatrixResultLength>2)
	{
		for(var i=colsMatrixResultLength;i>2;i--)
		{
			delCol("rowInMatrixResult");
		}
	}


	var firstMatrix=document.querySelectorAll(".first");
	var rowFirstMatrix=firstMatrix[0].querySelectorAll('div[class^="rowInMatrix"]');
	var rowFirstMatrixLength=rowFirstMatrix.length;
	
	for(var i=0;i<rowFirstMatrixLength-2;i++)
	{
		addRow("rowInMatrixResult","matrixResult","c");
	}			

	var secondMatrix=document.querySelectorAll(".second");
	var rowSecondMatrix=secondMatrix[0].lastChild;
	var colsSecondMatrix=rowSecondMatrix.getElementsByTagName("input");
	var colsSecondMatrixLength=colsSecondMatrix.length;
	for(var i=0;i<colsSecondMatrixLength-2;i++)
	{
		addCol("rowInMatrixResult","c");
	}

	var matrixResult=document.getElementById("matrixResult");
	var CellsMatrixResult=matrixResult.querySelectorAll('input[type^="text"]');
	for(var i=0;i<CellsMatrixResult.length;i++)
	{
		CellsMatrixResult[i].value="";
	}
}