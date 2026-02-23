import { DropdownMenu } from "radix-ui";
import styles from "./PayUser.module.css";
import { DotFilledIcon } from "@radix-ui/react-icons";


export const MOCK_USERS = [
    {
        id: "1",
        name: "김나영",
    },
    {
        id: "2",
        name: "이영희",
    },
    {
        id: "3",
        name: "박철수",
    },
    {
        id: "4",
        name: "최영희",
    },
    {
        id: "5",
        name: "이영희",
    },
]

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function PayUser({ value, onChange }: Props) {
    const selectedUser = MOCK_USERS.find((user) => user.id === value);

    return (
        <div className={styles.container}>
            <span className={styles.label}>결제자</span>
            <div className={styles.categories}>
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <button className={styles.Trigger}>
                            {selectedUser ? selectedUser.name : "결제자 선택"}
                        </button>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                        <DropdownMenu.Content className={styles.Content} sideOffset={5}>
                            <DropdownMenu.RadioGroup value={value} onValueChange={onChange}>
                                {MOCK_USERS.map((user) => (
                                    <DropdownMenu.RadioItem key={user.id} className={styles.RadioItem} value={user.id}>
                                        <DropdownMenu.ItemIndicator className={styles.ItemIndicator}>
                                            <DotFilledIcon />
                                        </DropdownMenu.ItemIndicator>
                                        {user.name}
                                    </DropdownMenu.RadioItem>
                                ))}
                            </DropdownMenu.RadioGroup>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            </div>
        </div>
    );
}
