

function calculateNextMove(){
    console.log("=======================================")
    return createLegalMoves()
}

function createLegalMoves(){
    var i = 0
    var move = checkSquareWinningMove()

    
    if(move != "We didn't find winning moves in this sector" && move != "We didn't find any square-winning moves on the board"){
        console.log("=======================================")
        return move
    }

    console.log(move)


    move = ""

    if(qualQuadrante[0] == -1 && qualQuadrante[1] == 3){
        while(i<81){
            move += Math.floor(Math.random() * 3).toString()
            move += Math.floor(Math.random() * 3).toString()
            move += Math.floor(Math.random() * 3).toString()
            move += Math.floor(Math.random() * 3).toString()
            if(checkMove(parseInt(move[0]),parseInt(move[1]),parseInt(move[2]),parseInt(move[3]))){
                if(i % 10 == 0){
                    console.log(`On the ${i +1}st try we found the move ${move} to be a legal move`)
                }else if(i % 10 == 1){
                    console.log(`On the ${i +1}nd try we found the move ${move} to be a legal move`)
                }
                else if(i % 10 == 2){
                    console.log(`On the ${i +1}rd try we found the move ${move} to be a legal move`)
                }
                else
                    console.log(`On the ${i +1}th try we found the move ${move} to be a legal move`)
                return move
            }
            move = ""
            i++
        }
    }
    else{

        move = checkAdjacentOrAcrossMove(qualQuadrante[0]+1, qualQuadrante[2]+1)

        if(move != "Couldn't find a good move to play"){
            console.log("=======================================")
            return move
        }

        console.log(move)

        move = ""

        while(i<9){
            move += qualQuadrante[0]+1
            move += qualQuadrante[2]+1
            move += Math.floor(Math.random() * 3).toString()
            move += Math.floor(Math.random() * 3).toString()
            if(checkMove(parseInt(move[0]),parseInt(move[1]),parseInt(move[2]),parseInt(move[3]))){
                if(i == 0){
                    console.log(`On the ${i +1}st try we found the move ${move} to be a legal move`)
                }else if(i == 1){
                    console.log(`On the ${i +1}nd try we found the move ${move} to be a legal move`)
                }
                else if(i == 2){
                    console.log(`On the ${i +1}rd try we found the move ${move} to be a legal move`)
                }
                else
                    console.log(`On the ${i +1}th try we found the move ${move} to be a legal move`)

                console.log("=======================================")
                return move
            }
            move = ""
            i++
        }
    }
}

function checkMove(X,Y,x,y){
    if(matriz[X][Y][x][y] <= 0){
        if(jogao[X][Y] <= 0){
            return true
        }
    }

    return false
}

function checkSquareWinningMove(){

    if(qualQuadrante[0] == -1 && qualQuadrante[1] == 3){

        console.log("SEARCHING FOR WINNING MOVES IN ENTIRE BOARD")

        var i = 0
        var j = 0
        var k = 0
        var l = 0
        while(i < 3){
            while(j<3){
                if(jogao[i][j] != 3 && jogao[i][j] != 12){
                    while(k < 3){
                        var soma = parseInt(matriz[i][j][k][0]) + parseInt(matriz[i][j][k][1]) + parseInt(matriz[i][j][k][2])
                        if(soma == 8){
                            while(l < 3){
                                if(parseInt(matriz[i][j][k][l]) == 0 && checkMove(i, j, k, l)){
                                    var movi = `${i}${j}${k}${l}`
                                    console.log(`Winning move found at ${movi}`)
                                    return movi
                                }
                                l++
                            }
                        }
                        l = 0
    
                        soma = parseInt(matriz[i][j][0][k]) + parseInt(matriz[i][j][1][k]) + parseInt(matriz[i][j][2][k])
    
                        if(soma == 8){
                            while(l < 3){
                                if(parseInt(matriz[i][j][l][k]) == 0 && checkMove(i, j, l, k)){
                                    var movi = `${i}${j}${l}${k}`
                                    console.log(`Winning move found at ${movi}`)
                                    return movi
                                }
                                l++
                            }
                        }
                        l = 0
    
                        k++
                    }
    
                    var soma = parseInt(matriz[i][j][0][0]) + parseInt(matriz[i][j][1][1]) + parseInt(matriz[i][j][2][2])
                    if(soma == 8){
                        while(l < 3){
                            if(parseInt(matriz[i][j][l][l]) == 0 && checkMove(i, j, l, l)){
                                var movi = `${i}${j}${l}${l}`
                                console.log(`Winning move found at ${movi}`)
                                return movi
                            }
                            l++
                        }
                        l = 0
                    }
    
                    soma = parseInt(matriz[i][j][2][0]) + parseInt(matriz[i][j][1][1]) + parseInt(matriz[i][j][0][2])
                    if(soma == 8){
                        while(l < 3){
                            var complemento = 2 - l
                            if(parseInt(matriz[i][j][complemento][l]) == 0 && checkMove(i, j, complemento, l)){
                                var movi = `${i}${j}${complemento}${l}`
                                console.log(`Winning move found at ${movi}`)
                                return movi
                            }
                            l++
                        }
                        l = 0
                    }
                    
                    k = 0
                }
                j++
            }
            j = 0
            i++
        }
        return "We didn't find any square-winning moves on the board"
    }
    else{
        var k = 0
        var l = 0
        var i = qualQuadrante[0]+1
        var j = qualQuadrante[2]+1
        console.log("SEARCHING FOR WINNING MOVES IN SECTOR "+ i + "-" + j)

        while(k < 3){
            var soma = parseInt(matriz[i][j][k][0]) + parseInt(matriz[i][j][k][1]) + parseInt(matriz[i][j][k][2])
            if(soma == 8){
                while(l < 3){
                    if(parseInt(matriz[i][j][k][l]) == 0 && checkMove(i, j, k, l)){
                        var movi = `${i}${j}${k}${l}`
                        console.log(`Winning move found at ${movi}`)
                        return movi
                    }
                    l++
                }
            }
            l = 0

            soma = parseInt(matriz[i][j][0][k]) + parseInt(matriz[i][j][1][k]) + parseInt(matriz[i][j][2][k])

            if(soma == 8){
                while(l < 3){
                    if(parseInt(matriz[i][j][l][k]) == 0 && checkMove(i, j, l, k)){
                        var movi = `${i}${j}${l}${k}`
                        console.log(`Winning move found at ${movi}`)
                        return movi
                    }
                    l++
                }
            }
            l = 0

            k++
        }

        var soma = parseInt(matriz[i][j][0][0]) + parseInt(matriz[i][j][1][1]) + parseInt(matriz[i][j][2][2])
        if(soma == 8){
            while(l < 3){
                if(parseInt(matriz[i][j][l][l]) == 0 && checkMove(i, j, l, l)){
                    var movi = `${i}${j}${l}${l}`
                    console.log(`Winning move found at ${movi}`)
                    return movi
                }
                l++
            }
            l = 0
        }

        soma = parseInt(matriz[i][j][2][0]) + parseInt(matriz[i][j][1][1]) + parseInt(matriz[i][j][0][2])
        if(soma == 8){
            while(l < 3){
                var complemento = 2 - l
                if(parseInt(matriz[i][j][complemento][l]) == 0 && checkMove(i, j, complemento, l)){
                    var movi = `${i}${j}${complemento}${l}`
                    console.log(`Winning move found at ${movi}`)
                    return movi
                }
                l++
            }
            l = 0
        }
    }

    return "We didn't find winning moves in this sector"
}

function checkAdjacentOrAcrossMove(X,Y){

    var game = matriz[X][Y]

    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            if(game[i][j] == 4){
                var soma = parseInt(game[i][0]) + parseInt(game[i][1]) + parseInt(game[i][2])
                if(soma == 4){
                    console.log("-- checando coluna --")
                    while(true){
                        var move = ""
                        move += `${qualQuadrante[0]+1}`
                        move += `${qualQuadrante[2]+1}`
                        move += `${i}`
                        move += Math.floor(Math.random() * 3).toString()

                        if(checkMove(parseInt(move[0]),parseInt(move[1]),parseInt(move[2]),parseInt(move[3]))){
                            console.log("We found an interesting move at " + move)
                            return move
                        }
                    }
                    
                }

                soma = parseInt(game[0][j]) + parseInt(game[1][j]) + parseInt(game[2][j])
                if(soma == 4){
                    console.log("-- checando linha --")
                    while(true){
                        var move = ""
                        move += `${qualQuadrante[0]+1}`
                        move += `${qualQuadrante[2]+1}`
                        move += Math.floor(Math.random() * 3).toString()
                        move += `${j}`
                        
                        if(checkMove(parseInt(move[0]),parseInt(move[1]),parseInt(move[2]),parseInt(move[3]))){
                            console.log("We found an interesting move at " + move)
                            return move
                        }
                    }
                    
                }

                if(i == j || i+j == 2){
                    console.log("-- checagem adicional --")
                    if(i+j != 2){
                        console.log("-- checando diagonal principal --")
                        var soma = parseInt(game[0][0]) + parseInt(game[1][1]) + parseInt(game[2][2])

                        if(soma == 4){
                            while(true){
                                var move = ""
                                move += `${qualQuadrante[0]+1}`
                                move += `${qualQuadrante[2]+1}`
                                var x = Math.floor(Math.random() * 3).toString()
                                move += x+x
        
                                if(checkMove(parseInt(move[0]),parseInt(move[1]),parseInt(move[2]),parseInt(move[3]))){
                                    console.log("We found an interesting move at " + move)
                                    return move
                                }
                            }
                            
                        }
                        
                    }else if(i == 0 || j == 0){
                        console.log("-- checando diagonal secundária --")

                        var soma = parseInt(game[2][0]) + parseInt(game[1][1]) + parseInt(game[0][2])

                        if(soma == 4){
                            while(true){
                                var move = ""
                                move += `${qualQuadrante[0]+1}`
                                move += `${qualQuadrante[2]+1}`
                                var x = Math.floor(Math.random() * 3).toString()
                                move += x
                                aux = 2-x
                                move += aux.toString()
        
                                if(checkMove(parseInt(move[0]),parseInt(move[1]),parseInt(move[2]),parseInt(move[3]))){
                                    console.log("We found an interesting move at " + move)
                                    return move
                                }
                            }
                            
                        }

                    }else{
                        console.log("-- checando as duas diagonais --")
                        var soma = parseInt(game[0][0]) + parseInt(game[1][1]) + parseInt(game[2][2])

                        if(soma == 4){
                            while(true){
                                var move = ""
                                move += `${qualQuadrante[0]+1}`
                                move += `${qualQuadrante[2]+1}`
                                var x = Math.floor(Math.random() * 3).toString()
                                move += x+x
        
                                if(checkMove(parseInt(move[0]),parseInt(move[1]),parseInt(move[2]),parseInt(move[3]))){
                                    console.log("We found an interesting move at " + move)
                                    return move
                                }
                            }
                            
                        }
                        
                        var soma = parseInt(game[2][0]) + parseInt(game[1][1]) + parseInt(game[0][2])

                        if(soma == 4){
                            while(true){
                                var move = ""
                                move += `${qualQuadrante[0]+1}`
                                move += `${qualQuadrante[2]+1}`
                                var x = Math.floor(Math.random() * 3).toString()
                                move += x
                                aux = 2-x
                                move += aux.toString()
        
                                if(checkMove(parseInt(move[0]),parseInt(move[1]),parseInt(move[2]),parseInt(move[3]))){
                                    console.log("We found an interesting move at " + move)
                                    return move
                                }
                            }
                            
                        }
                    }
                }
            }
        }
    }
    return "Couldn't find a good move to play"
}

