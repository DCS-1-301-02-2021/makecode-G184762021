scene.setBackgroundColor(8)
let spacePlane = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . f f f f . . . . . . . .
    . . . . 2 2 2 2 . . . . . . . .
    . . . . f f f f . . . . . . . .
    . . . . f f f f . . . . . . . .
    2 2 . . f f f f f 2 f f . . . .
    5 5 2 2 f f f f f 2 f f f f . .
    5 5 2 2 f f f f f 2 f f f f . .
    2 2 . . f f f f f 2 f f . . . .
    . . . . f f f f . . . . . . . .
    . . . . f f f f . . . . . . . .
    . . . . 2 2 2 2 . . . . . . . .
    . . . . f f f f . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Player)
info.setLife(3)
spacePlane.setStayInScreen(true)
controller.moveSprite(spacePlane, 200, 200)
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    let missile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . 2 f f f f f f f f f . . . .
            . . 2 f f f f f f f f f . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `, spacePlane, 200, 0)
})
game.onUpdateInterval(500, function on_update() {
    let bogy = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        1 1 . . . . e e e e . . . . 1 1
        1 1 1 1 . e e e e e e . 1 1 1 1
        1 1 1 1 1 e f e e f e e 1 1 1 1
        1 1 1 e e e f e e f e e e 1 1 .
        . . 1 e e e e e e e e e e . . .
        . . e e e e f f f f e e e e . .
        . . e e e e e e e e e e e e . .
        . . e e e e e e e e e e e e . .
        . . . . e e e . . e e . . . . .
        . . . e e e e . . e e e e . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, SpriteKind.Enemy)
    bogy.setVelocity(-100, randint(-30, 30))
    bogy.y = randint(0, scene.screenHeight())
    bogy.left = scene.screenWidth()
    bogy.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function on_hit(sprite: Sprite, othersprite: Sprite) {
    othersprite.destroy(effects.fire, 100)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_crash(sprite: Sprite, othersprite: Sprite) {
    othersprite.destroy()
    info.changeLifeBy(-1)
})
