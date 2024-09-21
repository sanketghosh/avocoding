import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type AuthCardWrapperProps = {
  cardTitle: string;
  cardDescription: string;
  children: React.ReactNode;
  footer: string;
};

export default function AuthCardWrapper({
  children,
  cardDescription,
  cardTitle,
  footer,
}: AuthCardWrapperProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>{footer}</CardFooter>
    </Card>
  );
}
