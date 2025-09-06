import { NextResponse } from "next/server";
import data from "../../../_db/db.json";
import { revalidatePath } from "next/cache";

export async function GET() {
  return NextResponse.json(data.pots, {
    status: 200,
  });
}

export async function PUT(request) {
  try {
    const { id, name, target, theme } = await request.json();

    if (!name || !target || !theme) {
      return NextResponse.json(
        { message: "All fields are required" },
        {
          status: 400,
        }
      );
    }

    const potIndex = data.pots.findIndex((pot) => pot.id === id);

    if (potIndex === -1) {
      return NextResponse.json(
        { message: "Pot not found" },
        {
          status: 404,
        }
      );
    }

    const updatedPot = {
      ...data.pots[potIndex],
      name,
      target,
      theme,
    };

    data.pots[potIndex] = updatedPot;

    revalidatePath("/pots");

    return NextResponse.json(updatedPot, {
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

    const potIndex = data.pots.findIndex((pot) => pot.id === id);

    if (potIndex === -1) {
      return NextResponse.json(
        { message: "Pot not found" },
        {
          status: 404,
        }
      );
    }

    data.pots.splice(potIndex, 1)[0];

    revalidatePath("/pots");
    return NextResponse.json(
      { message: "Pot deleted successfully" },
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
    const { name, target, theme } = await request.json();

    if (!name || !target || !theme) {
      return NextResponse.json(
        { message: "All fields are required" },
        {
          status: 400,
        }
      );
    }

    const newPot = {
      name,
      target,
      total: 0,
      theme,
      id: crypto.randomUUID(),
    };

    data.pots.push(newPot);

    revalidatePath("/pots");

    return NextResponse.json(newPot, {
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

export async function PATCH(request) {
  try {
    const { id, amount, action } = await request.json();

    if (!id || !amount || !action) {
      return NextResponse.json(
        { message: "All fields are required" },
        {
          status: 400,
        }
      );
    }

    const potIndex = data.pots.findIndex((pot) => pot.id === id);

    if (potIndex === -1) {
      return NextResponse.json(
        { message: "Pot not found" },
        {
          status: 404,
        }
      );
    }

    const pot = data.pots[potIndex];

    let newTotal;
    switch (action) {
      case "withdraw": {
        newTotal = Math.max(0, pot.total - amount); // clamp to 0
        data.balance.current += amount;
        break;
      }

      case "add": {
        if (amount > data.balance.current) {
          return NextResponse.json(
            { message: "Insufficient funds" },
            { status: 400 }
          );
        }
        data.balance.current -= amount;
        newTotal = pot.total + amount;
        break;
      }

      default:
        return NextResponse.json(
          { message: "Invalid action" },
          { status: 400 }
        );
    }

    const updatedPot = {
      ...pot,
      total: newTotal,
    };

    data.pots[potIndex] = updatedPot;

    revalidatePath("/pots");
    revalidatePath("/overview");

    return NextResponse.json(updatedPot, {
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
