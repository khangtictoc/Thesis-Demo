import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Image from "next/image";

const NavBar = () => {
	return (
		<Navbar fluid rounded>
			<Navbar.Brand href="https://flowbite.com/">
				<Image
					alt="Flowbite logo"
					height="32"
					src="/logo.svg"
					width="32"
				/>
				<span className="self-center whitespace-nowrap pl-3 text-xl font-semibold dark:text-white">
					AnalysicAPK
				</span>
			</Navbar.Brand>
			<div className="flex md:order-2">
				<Dropdown
					inline
					label={
						<Avatar
							alt="User settings"
							img="/profile-picture-5.jpg"
							rounded
						/>
					}
				>
					<Dropdown.Header>
						<span className="block text-sm">Bonnie Green</span>
						<span className="block truncate text-sm font-medium">
							name@flowbite.com
						</span>
					</Dropdown.Header>
					<Dropdown.Item>Dashboard</Dropdown.Item>
					<Dropdown.Item>Settings</Dropdown.Item>
					<Dropdown.Item>Earnings</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item>Sign out</Dropdown.Item>
				</Dropdown>
				<Navbar.Toggle />
			</div>
			<Navbar.Collapse>
				<Navbar.Link href="/navbars" active>
					Home
				</Navbar.Link>
				<Navbar.Link href="/navbars">About</Navbar.Link>
				<Navbar.Link href="/navbars">Services</Navbar.Link>
				<Navbar.Link href="/navbars">Pricing</Navbar.Link>
				<Navbar.Link href="/navbars">Contact</Navbar.Link>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavBar;
