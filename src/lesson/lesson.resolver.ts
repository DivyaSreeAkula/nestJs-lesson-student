import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { StudentService } from "src/student/student.service";
import { AssignStudentsToLessonInput } from "./assign.student.to.lessons.input";
import { Lesson } from "./lesson.entity";
import { CreateLessonInput } from "./lesson.input";
import { LessonService } from "./lesson.service";
import { LessonType } from "./lesson.type";

@Resolver(_of=>LessonType)
export class LessonResolver{
    constructor(
        private lessonService: LessonService,
        private studendServive: StudentService
    ){

    }
    @Query(returns=>LessonType)
    lesson(@Args('id') id:string){
        return this.lessonService.getLesson(id)
    }

    @Query(returns=>[LessonType])
    lessons(){
        return this.lessonService.getLessons()
    }

    @Mutation(returns =>LessonType)
    createLesson(
        @Args('createLessonInput') createLessonInput:CreateLessonInput,
    ){
        return this.lessonService.createLesson(createLessonInput)
    }

    @Mutation(returns=> LessonType)
    assignStudentsToLesson( @Args('assignStudentsToLessonInput') assignStudentsToLesson:AssignStudentsToLessonInput){
        const {studentIds, lessonId}= assignStudentsToLesson;
        return this.lessonService.assignStudentsToLessons(lessonId,studentIds)

    }

    @ResolveField()
    async students(@Parent() lesson:Lesson){
        return this.studendServive.getStudentByIds(lesson.students)
    }
}