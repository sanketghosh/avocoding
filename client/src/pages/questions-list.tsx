import QuestionCard from "@/components/cards/question-card";
import AddQuestionModal from "@/components/modals/add-question-modal";

export default function QuestionsList() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <AddQuestionModal />
        {[1, 2, 3, 4, 5, 6, 7, 11, 12, 14].map((item, idx) => (
          <QuestionCard
            slNo={idx + 1}
            key={idx + item}
            title="
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis explicabo suscipit, sunt nihil nulla beatae exercitationem, itaque maxime, nam placeat officia? Veritatis ipsam sunt tempora optio esse, ratione fugiat accusamus!
          "
          />
        ))}
      </div>
    </div>
  );
}
