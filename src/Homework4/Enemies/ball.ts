import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { EnemyStates } from "./EnemyController";
import OnGround from "./OnGround";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import { HW4_Events } from "../hw4_enums";

export default class ball extends OnGround {
	time: number;
	
	
	
	onEnter(): void {
			this.parent.direction = new Vec2(0, -1);
			(<AnimatedSprite>this.owner).invertX = true;

		(<AnimatedSprite>this.owner).animation.play("WALK", true);
		
		this.parent.velocity.x=0;

		
		this.gravity = 500;
	}
	handleInput(event: GameEvent) {
		if(event.type === HW4_Events.PLAYER_MOVE){
			let pos = event.data.get("position");
			if(this.owner.position.x - pos.x > (64)){
				// this.parent.changeState(EnemyStates.IDLE);
				// // this.parent.velocity.x=0;
				// this.parent.velocity.y=0;
				this.finished(EnemyStates.WALK);
			
			}
			
			
		}
		if(event.type === HW4_Events.PLAYER_MOVE){
			let pos = event.data.get("position");
			if( pos.x-this.owner.position.x > (64)){
				// this.parent.changeState(EnemyStates.IDLE);
				// this.parent.velocity.x=0;
				// this.parent.velocity.y=0;
				this.finished(EnemyStates.WALK);
			
			}
			
			
		}
	}

	update(deltaT: number): void {
		
		super.update(deltaT);
		this.time = Date.now();
		if(this.owner.onGround){
			this.parent.velocity.y=this.parent.direction.y * this.parent.speed*2;
		}
		this.parent.velocity.y+=50;

		this.owner.move(this.parent.velocity.scaled(deltaT));
	}

	onExit(): Record<string, any> {
		(<AnimatedSprite>this.owner).animation.stop();
		return {};
	}
}