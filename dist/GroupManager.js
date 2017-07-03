
export default class GroupManager {
  constructor() {
    this.groupStore = {};
  }

  wrap(story, context){
    if(context.story !== "All" && context.story.split("-")[1]){
      var key = context.kind+":"+context.story
      this.groupStore[key] = story
    }
  }

  get(){
    return this.groupStore
  }

}
