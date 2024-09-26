// components
import QuestionCard from "@/components/cards/question-card";
import AddQuestionModal from "@/components/modals/add-question-modal";

export default function QuestionsList() {
  return (
    <div>
      <Header />
      <div className="w-full py-4">
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
    </div>
  );
}

function Header() {
  return (
    <div className="space-y-3 border-b pb-4">
      <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl">
        Folder name goes here
      </h1>
      <p className="max-w-3xl font-medium text-muted-foreground">
        This is nothing just the dummy description of the folder you are inside.
      </p>
    </div>
  );
}
