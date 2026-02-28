import { DropdownMenu } from "radix-ui";
import styles from "./PayUser.module.css";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useGroup } from "@/store/useGroup";
import { getGroupMembersWithUsers } from "@/services/groupMembersService";

interface User {
  id: string;
  nickname: string;
}

interface Props {
  value: string;
  onChange: (userId: string, userObj: User) => void;
}

export default function PayUser({ value, onChange }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const { group } = useGroup();

  useEffect(() => {
    if (!group?.id) return;

    getGroupMembersWithUsers(group.id).then((groupMembers) => {
      const formattedUsers = groupMembers.map((groupMember) => ({
        id: groupMember.user.id,
        nickname: groupMember.user.nickname || "",
      }));
      setUsers(formattedUsers);
    });
  }, [group?.id]);

  const selectedUser = users.find((user) => user.id === value);

  return (
    <div className={styles.container}>
      <span className={styles.label}>결제자</span>
      <div className={styles.categories}>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className={styles.Trigger}>
              {selectedUser ? selectedUser.nickname : "결제자 선택"}
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content className={styles.Content} sideOffset={5}>
              {/* Radix UI의 RadioGroup에 value 연결 */}
              <DropdownMenu.RadioGroup value={value}>
                {users.map((u) => (
                  <DropdownMenu.RadioItem
                    key={u.id}
                    className={styles.RadioItem} // 사라졌던 클래스명 복구
                    value={u.id}
                    onSelect={() => onChange(u.id, u)} // 데이터 전달 로직 유지
                  >
                    {/* 체크 표시 아이콘 레이아웃 복구 */}
                    <DropdownMenu.ItemIndicator
                      className={styles.ItemIndicator}
                    >
                      <DotFilledIcon />
                    </DropdownMenu.ItemIndicator>

                    {u.nickname}
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
