import { areSameColorTiles, findPieceCoords } from '../helper';
import { getKnightMoves, getRookMoves, getBishopMoves, getQueenMoves, getKingMoves, getPawnMoves, getPawnCaptures, getCastlingMoves, getPieces, getKingPosition } from './getMoves'
import { movePiece, movePawn } from './move';

interface Arbiter {
    getRegularMoves: ({ position, piece, rank, file }: { position: string[][], piece: string, rank: any, file: any }) => [number, number][] ;
    getValidMoves: ({ position, castleDirection, prevPosition, piece, rank, file }: { position: string[][], castleDirection: any, prevPosition: any, piece: string, rank: any, file: any }) => any[];
    isPlayerInCheck: ({ positionAfterMove, position, player }: { positionAfterMove: string[][], position: string[][], player: string }) => boolean;
    performMove: ({ position, piece, rank, file, x, y }: { position: string[][], piece: string, rank: number, file: number, x: number, y: number }) => any;
    isStalemate: (position: string[][], player: string, castleDirection: string) => boolean;
    insufficientMaterial: (position: string[][]) => boolean;
    isCheckMate: (position: string[][], player: string, castleDirection: string) => boolean;
}

const arbiter: Arbiter = {

    getRegularMoves: function ({ position, piece, rank, file }) {
        if (piece.endsWith('n'))
            return getKnightMoves({ position, rank, file });
        if (piece.endsWith('b'))
            return getBishopMoves({ position, piece, rank, file });
        if (piece.endsWith('r'))
            return getRookMoves({ position, piece, rank, file });
        if (piece.endsWith('q'))
            return getQueenMoves({ position, piece, rank, file });
        if (piece.endsWith('k'))
            return getKingMoves({ position, piece, rank, file });
        if (piece.endsWith('p'))
            return getPawnMoves({ position, piece, rank, file })
        return [[0,0]]
    },

    getValidMoves: function ({ position, castleDirection, prevPosition, piece, rank, file }) {
        let moves = this.getRegularMoves({ position, piece, rank, file })
        const notInCheckMoves: any[] = []

        if (piece.endsWith('p')) {
            moves = [
                ...moves,
                ...getPawnCaptures({ position, prevPosition, piece, rank, file })
            ]
        }
        if (piece.endsWith('k'))
            moves = [
                ...moves,
                ...getCastlingMoves({ position, castleDirection, piece, rank, file })
            ]

        moves.forEach(([x, y]) => {
            const positionAfterMove =
                this.performMove({ position, piece, rank, file, x, y })

            if (!this.isPlayerInCheck({ positionAfterMove, position, player: piece[0] })) {
                notInCheckMoves.push([x, y])
            }
        })
        return notInCheckMoves
    },

    isPlayerInCheck: function ({ 
        positionAfterMove, 
        position, 
        player 
      }: { 
        positionAfterMove: string[][], 
        position: string[][], 
        player: string 
      }): boolean {
        const enemy = player.startsWith('w') ? 'b' : 'w';
        let kingPos = getKingPosition(positionAfterMove, player);
        const enemyPieces = getPieces(positionAfterMove, enemy);
      
        const enemyMoves = enemyPieces.reduce((acc: number[][], p: any) => {
          return [
            ...acc,
            ...(p.piece.endsWith('p')
              ? getPawnCaptures({
                  position: positionAfterMove,
                  prevPosition: position,
                  ...p
                })
              : this.getRegularMoves({
                  position: positionAfterMove,
                  ...p
                })
            )
          ];
        }, []);
      
        if (enemyMoves.some(([x, y]: number[]) => kingPos[0] === x && kingPos[1] === y)) {
          return true;
        } else {
          return false;
        }
      },

    performMove: function ({ position, piece, rank, file, x, y }) {
        if (piece.endsWith('p'))
            return movePawn({ position, piece, rank, file, x, y })
        else
            return movePiece({ position, piece, rank, file, x, y })
    },

    isStalemate: function (position: string[][], player: string, castleDirection: string): boolean {
        const isInCheck: boolean = this.isPlayerInCheck({ positionAfterMove: position,position, player });

        if (isInCheck) {
            return false;
        }

        const pieces: any[] = getPieces(position, player);
        const moves: any[] = pieces.reduce((acc: any[], p: any) => acc = [
            ...acc,
            ...(this.getValidMoves({
                position,
                castleDirection,
                ...p
            })
            )
        ], []);

        return (!isInCheck && moves.length === 0);
    },

    insufficientMaterial: function (position: string[][]): boolean {

        const pieces: string[] =
            position.reduce((acc: string[], rank: string[]) =>
                acc = [
                    ...acc,
                    ...rank.filter((spot: string | null) => spot)
                ], [])

        // King vs. king
        if (pieces.length === 2)
            return true

        // King and bishop vs. king
        // King and knight vs. king
        if (pieces.length === 3 && pieces.some((p: string) => p.endsWith('b') || p.endsWith('n')))
            return true

        // King and bishop vs. king and bishop of the same color as the opponent's bishop
        if (pieces.length === 4 &&
            pieces.every((p: string) => p.endsWith('b') || p.endsWith('k')) &&
            new Set(pieces).size === 4 &&
            areSameColorTiles(
                findPieceCoords(position, 'wb')[0],
                findPieceCoords(position, 'bb')[0]
            )
        )
            return true;

        return false;

    },

    isCheckMate:function checkIfPlayerIsInCheck(position: string[][], player: string ,castleDirection: string ): boolean {
        const isInCheck: boolean = this.isPlayerInCheck({positionAfterMove: position,position, player});

        if (!isInCheck)
            return false;
            
        const pieces: any[] = getPieces(position, player);
        const moves: any[] = pieces.reduce((acc: any[], p: any) => acc = [
            ...acc,
            ...(this.getValidMoves({
                    position, 
                    castleDirection, 
                    ...p
                })
            )
        ], []);

        return (isInCheck && moves.length === 0);
    }

}

export default arbiter;