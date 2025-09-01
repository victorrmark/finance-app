import { NextResponse } from "next/server";
import data from "../../../_db/db.json";
import { revalidatePath } from "next/cache";

export async function GET() {
  return NextResponse.json(data.budgets, {
    status: 200,
  });
}

export async function PUT(request) {
  try {
    const { id, category, maximum, theme } = await request.json();

    const budgetIndex = data.budgets.findIndex((budget) => budget.id === id);

    if (budgetIndex === -1) {
      return NextResponse.json(
        { message: "Budget not found" },
        {
          status: 404,
        }
      );
    }

    const updatedBudget = {
      ...data.budgets[budgetIndex],
      category,
      maximum,
      theme,
    };

    data.budgets[budgetIndex] = updatedBudget;

    revalidatePath("/budgets")

    return NextResponse.json(updatedBudget, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    const budgetIndex = data.budgets.findIndex((budget) => budget.id === id);

    if (budgetIndex === -1) {
      return NextResponse.json(
        { message: "Budget not found" },
        {
          status: 404,
        }
      );
    }

    data.budgets.splice(budgetIndex, 1)[0];

    revalidatePath("/budgets");
    return NextResponse.json(
      { message: "Budget deleted successfully" },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request) {
  try {
    const {category, maximum, theme} = await request.json();


    if (!category || !maximum || !theme) {
      return NextResponse.json(
        { message: "All fields are required" },
        {
          status: 400,
        }
      );
    }

    const newBudget = {
      id: crypto.randomUUID(),
      category,
      maximum,
      theme,
    };

    data.budgets.push(newBudget);

    revalidatePath("/budgets");

    return NextResponse.json(newBudget, {
      status: 200,
    });

  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}


