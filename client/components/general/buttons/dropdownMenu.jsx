import { Dropdown } from 'primereact/dropdown';
import { changeMembership, changeActivity } from '@/utils/logs';
import { toast } from 'react-hot-toast';

export default function CustomDropdown({ ...props }) {
    const { rowData, type, members, setMembers } = props;
    let value = rowData;
    let notification = "Account activity";
    let options = [];

    if (type === "approval") {
        value = rowData.membership_approved;
        notification = "Membership status";
        options = [{ label: 'Approved', value: true }, { label: 'Disproved', value: false }];
    } else if (type === "status") {
        value = rowData.user.is_active;
        options = [{ label: 'Active', value: true }, { label: 'Inactive', value: false }];
    }

    const onDropdownChange = async (rowData, value) => {
        let updatedMembers = [...members.members];
        let updatedMember = { ...rowData };
        if (type === "status") {
            updatedMember.user.is_active = value;
        } else if (type === "approval") {
            updatedMember.membership_approved = value;
        }
        const memberIndex = updatedMembers.findIndex(member => member.id === rowData.id);

        if (memberIndex !== -1) {
            updatedMembers[memberIndex] = updatedMember;
            setMembers({ members: updatedMembers });
        }

        if (rowData.id) {
            let data;
            if (type === 'approval') {
                data = await changeMembership(value, rowData.id);
            } else if (type === 'status') {
                data = await changeActivity(value, rowData.id);
            }

            if (!data || data.error || data.detail) {
                console.error(data);
                return;
            } else {
                toast.success(`${notification} updated for ${rowData.user.first_name} ${rowData.user.last_name}!`);
            }
        }
    }

    return (
        <Dropdown
            className="w-full border border-gray-300"
            value={value}
            options={options}
            onChange={(e) => onDropdownChange(rowData, e.value)}
            panelClassName="bg-white border border-gray-300"
        />
    );
}