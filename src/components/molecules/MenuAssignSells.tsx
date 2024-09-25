import { Button, Menu } from "@mantine/core";
import React from "react";
import { useFetch, useMutate } from "../../hooks";
import { notify } from "../../utils/toast";
import { Spinner } from "../atoms";

function MenuAssignSells({ refetch, bookingId }) {
  const { data: allUsers } = useFetch({
    queryKey: [`users`],
    endpoint: `users`,

    onError: (err) => {
      notify("error", err?.response?.data?.message);
    },
  });

  const { mutate, isLoading } = useMutate({
    mutationKey: [`bookings/${bookingId}/assign-sale`],
    endpoint: `bookings/${bookingId}/assign-sale`,
    onSuccess: () => {
      refetch();
      notify("success");
    },
    onError: (err) => {
      notify("error", err?.response?.data?.message);
    },
  });

  console.log("🚀 ~ MenuAssignSells ~ allUsers:", allUsers);
  return (
    <div>
      <Menu width={200} shadow="md">
        <Menu.Target>
          <Button className="bg-main">
            {
                isLoading ? <Spinner/> :"Assign sells"
            }
            </Button>
        </Menu.Target>

        <Menu.Dropdown>
          {allUsers?.data?.map((item) => (
            <React.Fragment key={item?.id}>
              <Menu.Item
                onClick={() =>
                  mutate({
                    sale_id: item?.id,
                  })
                }
              >
                {item?.name}
              </Menu.Item>
              <Menu.Divider />
            </React.Fragment>
          ))}
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}

export default MenuAssignSells;
