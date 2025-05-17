import { model, Schema } from "mongoose"
import { Assignments } from "./assignments.entity"

const assignmentsSchema = new Schema<Assignments>({
    title: String,
    studentsCount: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
});

assignmentsSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

export const AssignmentsModel = model<Assignments>('Assignment', assignmentsSchema);